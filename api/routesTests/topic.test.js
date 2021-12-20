const request = require("supertest");
const User = require("../models/User");
const Group = require("../models/Group");
const Topic = require("../models/Topic");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async () => {
  try {
    const result_1 = await Topic.findOne({ name: "testtopic" });
    if (result_1 != null) {
      await Topic.deleteOne({ name: "testtopic" });
      console.log("info", "Successfully deleted the topic");
    }
    const result_2 = await Group.findOne({ name: "testgroup" });
    if (result_2 != null) {
      await Group.deleteOne({ name: "testgroup" });
      console.log("info", "Successfully deleted the group");
    }
    const result_3 = await User.findOne({ username: "testingUser" });
    if (result_3 != null) {
      await User.deleteOne({ username: "testingUser" });
      console.log("info", "Successfully deleted user");
    }
  } catch (err) {
    console.log("error", err.message);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase();
});

describe("get topics", () => {
  test("get all topics", async () => {
    request(webapp)
      .get("/api/topic")
      .expect(200)
      .then((response) => {
        const topics = response.body;
        expect(topics.length).not.toBe(0);
      });
  });
});

describe("create, get, update topic", () => {
  test("create topic", async () => {
    const testUser = {
      username: "testingUser",
      email: "group@gmail.com",
      firstName: "ruichen",
      lastName: "zhang",
      password: "test",
    };
    const user = await User.create(testUser);
    const userId = user._id;
    const testGroup = {
      name: "testgroup",
      owner: userId,
      type: "public",
      description: "groupsss",
      topics: ["Sports"],
    };
    const group = await Group.create(testGroup);
    const groupId = group._id;

    const res = await request(webapp)
      .post("/api/topic/")
      .send({
        name: "testtopic",
        group_ids: [groupId],
      });
    expect(res.status).toBe(201);

    // get topic by id
    const g_id = await res.body._id;
    const res2 = await request(webapp).get(`/api/topic/id/${g_id}`);
    expect(res2.status).toBe(200);

    // get topic by name
    const g_name = await res.body.name;
    const res3 = await request(webapp).get(`/api/topic/name/${g_name}`);
    expect(res3.status).toBe(200);
  });
});
