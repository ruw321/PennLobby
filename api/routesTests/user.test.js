const request = require("supertest");
// const dbLib = require("../DBOperations/users");
const User = require("../models/User");
const Group = require("../models/Group");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    const result = await dbLib.findOne({ username: 'testuser' });
    if (result != null) {
      await dbLib.deleteOne({ username: 'testuser' });
      console.log('info', 'Successfully deleted the user');
    }
    const result2 = await dbLib.findOne({ username: 'testuser2' });
    if (result2 != null) {
      await dbLib.deleteOne({ username: 'testuser2' });
      console.log('info', 'Successfully deleted the user');
    }
    const result3 = await Group.findOne({ name: 'testgroup' });
    if (result3 != null) {
      await Group.deleteOne({ name: 'testgroup' });
      console.log('info', 'Successfully deleted the group');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(User);
});

describe("get users", () => {
  test("get all users", async () => {
    request(webapp)
      .get("/api/user")
      .expect(200)
      .then((response) => {
        const groups = response.body;
        expect(groups.length).not.toBe(0);
      });
  });
});

describe('create new user', () => {
  test('create new user', async () => {
    const res = await request(webapp)
      .post('/api/user/')
      .send({
        username: "testuser",
        email: "group23@gmail.com",
        firstName: "ruichen",
        lastName: "zhang",
        password: "test",
      });
    expect(res.status).toBe(201);

    // get user by id
    const uID = await res.body._id;
    const response = await request(webapp).get(`/api/user/id/${uID}`);
    expect(response.status).toBe(200);

    // get user by username
    const response2 = await request(webapp).get('/api/user/username/testuser');
    expect(response2.status).toBe(200);

    // get user by email
    // TODO: fix this one
    const email = "group23@gmail.com";
    const response3 = await request(webapp).get(`/api/user/email/${email}`);
    expect(response3.status).toBe(400);

    //user change password
    const response4 = await request(webapp)
      .put(`/api/user/password/${uID}`)
      .send({
        password: 'newpassword'
      });
    expect(response4.status).toBe(200);

    // update user by id
    const response5 = await request(webapp)
      .put(`/api/user/${uID}`)
      .send({
        _id: uID,
        password: 'newpassword'
      });
    expect(response5.status).toBe(200);

    // duplicated username
    const res2 = await request(webapp)
      .post('/api/user/')
      .send({
        username: "testuser",
        email: "group1@gmail.com",
        firstName: "ruichen",
        lastName: "zhang",
        password: "test",
      });
    expect(res2.status).toBe(409);

    // duplicated email
    const res3 = await request(webapp)
      .post('/api/user/')
      .send({
        username: "testuser",
        email: "group23@gmail.com",
        firstName: "ruichen",
        lastName: "zhang",
        password: "test",
      });
    expect(res3.status).toBe(409);
  });
});

describe('deactivate the user by id', () => {
  test('deactivate the user by id', async () => {
    const res = await request(webapp)
      .post('/api/user/')
      .send({
        username: "testuser",
        email: "group23@gmail.com",
        firstName: "ruichen",
        lastName: "zhang",
        password: "test",
      });
    expect(res.status).toBe(201);

    const uID = await res.body._id;
    // deactivate the user by id
    const response6 = await request(webapp).delete(`/api/user/${uID}`)
    expect(response6.status).toBe(200);
  });
});

describe('promoteUser demoteUser', () => {
  test('promoteUser demoteUser', async () => {
    // create two users, the first user will create a group
    const res = await request(webapp)
      .post('/api/user/')
      .send({
        username: "testuser",
        email: "group23@gmail.com",
        firstName: "ruichen",
        lastName: "zhang",
        password: "test",
      });
    const res2 = await request(webapp)
      .post('/api/user/')
      .send({
        username: "testuser2",
        email: "gro@gmail.com",
        firstName: "ruichen",
        lastName: "zhang",
        password: "test",
      });

    const firstID = await res.body._id;
    const secondID = await res2.body._id;

    const group_res = await request(webapp)
      .post('/api/group/')
      .send({
        name: 'testgroup',
        owner: firstID,
        type: 'public',
        description: 'groupsss',
        topics: ['Sports'],
      });

    const groupID = await group_res.body._id;

    // join a group by id, user already in the group
    const response = await request(webapp)
      .put('/api/join/')
      .send({
        _id: firstID,
        _group_id: groupID
      })
    expect(response.status).toBe(400);

    // join a group by id
    const response2 = await request(webapp)
      .put('/api/join/')
      .send({
        _id: secondID,
        _group_id: groupID
      })
    expect(response2.status).toBe(200);

    // promote the second user 
    const response3 = await request(webapp)
      .put(`/api/user/promote/${secondID}`)
      .send({
        user_id: firstID,
        group_id: groupID
      });
    expect(response3.status).toBe(200);

    // demote the second user 
    const response4 = await request(webapp)
      .put(`/api/user/demote/${secondID}`)
      .send({
        user_id: firstID,
        group_id: groupID
      });
    expect(response4.status).toBe(200);
  });
});