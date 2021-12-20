const request = require("supertest");
const dbLib = require("../DBOperations/posts");
const Post = require("../models/Post");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (Post) => {
  try {
    await Post.deleteOne({ title: "test1" });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Post);
});

describe("Endpoint API & integration tests", () => {
  // test data
  const testPost = {
    title: "test1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    group_id: "61bfaed5f5521300169eae48",
    author_id: "61bfaebcf5521300169eae37",
  };

  // test("add a new post", async () => {
  //   request(webapp)
  //     .post("/api/post/")
  //     .send(testPost)
  //     .expect(201)
  //     .then((response) => {
  //       const post = response.body;
  //       expect(post.title).toEqual(testPost.title);
  //     });
  // });

  test("get all posts", async () => {
    await request(webapp)
      .get("/api/post/")
      .expect(200)
      .then((response) => {
        expect(0).toEqual(0);
      });
  });
});
