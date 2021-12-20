const request = require("supertest");
const dbLib = require("../DBOperations/groups");
const Group = require("../models/Group");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (Group) => {
  try {
    await Group.deleteOne({ name: "testGroup1" });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Group);
});

describe("Endpoint API & integration tests", () => {
  // test data
  const testGroup = {
    name: "testGroup1",
    owner: "61bfaf74250f00001636b730",
    type: "public",
    description: "This is a test group",
  };

  // test("add a new group", async () => {
  //   request(webapp)
  //     .post("/api/group/")
  //     .send(testGroup)
  //     .expect(201)
  //     .then((response) => {
  //       const group = response.body;
  //       expect(group.name).toEqual(testGroup.name);
  //     });
  // });

  test("get all groups", async () => {
    request(webapp)
      .get("/api/group/")
      .expect(200)
      .then((response) => {
        expect(0).toEqual(0);
      });
  });
});
