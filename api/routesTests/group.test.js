const request = require("supertest");
const User = require("../models/User");
const Group = require("../models/Group");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    const result = await Group.findOne({ name: "testgroup" });
    if (result != null) {
      await Group.deleteOne({ name: "testgroup" });
      console.log("info", "Successfully deleted the group");
    }
    const result_2 = await User.findOne({ username: "testingUser" });
    if (result_2 != null) {
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
  await clearDatabase(User);
});

describe("get groups", () => {
  test("get all groups", async () => {
    request(webapp)
      .get("/api/group")
      .expect(200)
      .then((response) => {
        const groups = response.body;
        expect(groups.length).not.toBe(0);
      });
  });
  test("get all public groups", async () => {
    request(webapp)
      .get("/api/group/public")
      .expect(200)
      .then((response) => {
        const groups = response.body;
        expect(groups.length).not.toBe(0);
      });
  });
});

describe("create Public Group", () => {
  test("create Public Group", async () => {
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
      .post("/api/group/")
      .send({
        name: "testgroup",
        owner: id,
        type: "public",
        description: "groupsss",
        topics: ["Sports"],
      });
    expect(res.status).toBe(201);

    const g_id = await res.body._id;
    const res2 = await request(webapp).get(`/api/group/${g_id}`);
    expect(res2.status).toBe(200);

    // update group by id
    const res3 = await request(webapp).put(`/api/group/${g_id}`).send({
      _id: g_id,
      type: "private",
    });
    expect(res3.status).toBe(200);

    // // delete group by id
    // const res4 = await request(webapp).delete(`/api/group/${g_id}`);
    // console.log(res4.body);
    // expect(res4.status).toBe(200);
  });
});
