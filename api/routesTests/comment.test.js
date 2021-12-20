const request = require("supertest");
const User = require("../models/User");
const Group = require("../models/Group");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
// clean comment
const clearDatabase = async () => {
  try {
    const result_0 = await Comment.findOne({ content: "testcomment" });
    if (result_0 != null) {
      await Comment.deleteOne({ content: "testcomment" });
      console.log("info", "Successfully deleted the comment");
    }
    const result = await Post.findOne({ title: "testpost" });
    if (result != null) {
      await Post.deleteOne({ title: "testpost" });
      console.log("info", "Successfully deleted the post");
    }
    const result_2 = await Group.findOne({ name: "testgroup" });
    if (result_2 != null) {
      await User.deleteOne({ name: "testgroup" });
      console.log("info", "Successfully deleted the group");
    }
    const result_3 = await User.findOne({ username: "testingUser" });
    if (result_3 != null) {
      await User.deleteOne({ username: "testingUser" });
      console.log("info", "Successfully deleted the user");
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

describe("create, get, update comment, get comments", () => {
  test("create comment", async () => {
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
    const testPost = {
      title: "testpost",
      content: "hello world",
      group_id: groupId,
      author_id: userId,
    };
    const post = await Post.create(testPost);
    const postId = post._id;
    const res = await request(webapp).post("/api/comment/").send({
      content: "testcomment",
      post_id: postId,
      author_id: userId,
    });
    expect(res.status).toBe(201);

    // get comment by id
    const g_id = await res.body._id;
    const res2 = await request(webapp).get(`/api/comment/${g_id}`);
    expect(res2.status).toBe(200);

    // update comment by id
    const res3 = await request(webapp).put(`/api/comment/${g_id}`).send({
      content: "testcomment2",
      user_id: userId,
    });
    expect(res3.status).toBe(200);

    const res4 = await request(webapp).put(`/api/comment/${g_id}`).send({
      content: "testcomment",
      user_id: userId,
    });
    expect(res4.status).toBe(200);

    // get all comments by post id
    const res5 = await request(webapp).get(`/api/comment/all/${postId}`);
    expect(res4.status).toBe(200);
  });
});
