const request = require("supertest");
// const dbLib = require("../DBOperations/users");
const User = require("../models/User");
const Group = require("../models/Group");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async () => {
  try {
    const result = await Group.findOne({ name: 'testgroup' });
    if (result != null) {
      await Group.deleteOne({ name: 'testgroup' });
      console.log('info', 'Successfully deleted the group');
    }
    const result_2 = await User.findOne({ username: 'testingUser' });
    if (result_2 != null) {
      await User.deleteOne({ username: 'testingUser' });
      console.log('info', 'Successfully deleted user');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase();
});

describe('quit group by id', () => {
  test('quit group by id', async () => {
    const testUser = {
      username: "testingUser",
      email: "group@gmail.com",
      firstName: "ruichen",
      lastName: "zhang",
      password: "test",
    };

    const response = await User.create(testUser);
    const id = await response._id;
    const res = await request(webapp)
      .post('/api/group/')
      .send({ 
        name: 'testgroup', 
        owner: id, 
        type: 'public', 
        description: 'groupsss',
        topics: ['Sports'],
      });
    
    const g_id = await res.body._id;

    // quit the group
    const res3 = await request(webapp)
      .delete(`/api/quit/`)
      .send({
        _id: id,
        _group_id: g_id,
      });
    expect(res3.status).toBe(200);
  });
});
