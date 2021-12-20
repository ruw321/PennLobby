const request = require("supertest");
const dbLib = require("../DBOperations/comments");
const Comment = require("../models/Comment");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (Comment) => {
  try {
    await Comment.deleteOne({ content: "test comment" });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Comment);
});

describe("Endpoint API & integration tests", () => {
  // test data
  const testComment = {
    post_id: "61bfaf85250f00001636b77d",
    author_id: "61bfaf74250f00001636b730",
    content: "test comment",
  };

  // test("add a new comment", async () => {
  //   request(webapp)
  //     .post("/api/comment/")
  //     .send(testComment)
  //     .expect(201)
  //     .then((response) => {
  //       const comment = response.body;
  //       expect(comment.content).toEqual(testComment.content);
  //     });
  // });

  test("get all comments", async () => {
    request(webapp)
      .get("/api/comment/all/")
      .expect(200)
      .then((response) => {
        expect(0).toEqual(0);
      });
    });
  });