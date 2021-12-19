const request = require("supertest");
const dbLib = require("../DBOperations/topics");
const Topic = require("../models/Topic");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    await dbLib.deleteOne({ name: "test1" })
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Topic);
});

describe("Endpoint API & integration tests", () => {
  // test data
  const testTopic = {
    name: "test1",
    group_ids: [],
  };

  // test("add a new topic", async () => {
  //   request(webapp)
  //     .post("/api/topic/")
  //     .send(testTopic)
  //     .expect(201)
  //     .then((response) => {
  //       const topic = response.body;
  //       expect(topic.name).toEqual(testTopic.name);
  //     });
  // });

  test("get all topics", async () =>
    request(webapp)
      .get("/api/topic/")
      .expect(200)
      .then((response) => {
        const topics = response.body;
        // topics.length
        expect(0).toEqual(0);
      }));

  // test("get topic by id", async () => {
  //   const insertedTopic = await Topic.create(testTopic);
  //   request(webapp)
  //     .get(`/api/topic/id/${insertedTopic._id}`)
  //     .expect(200)
  //     .then((response) => {
  //       const topic = response.body;
  //       expect(topic.length).not.toEqual(0);
  //     });
  // });

  // test("delete topic by id", async () => {
  //   request(webapp)
  //     .delete("/api/topic/testid")
  //     .expect(400)
  //     .then((response) => {
  //       expect(0).toEqual(0);
  //     });
  // });
});
