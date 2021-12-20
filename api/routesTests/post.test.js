const request = require("supertest");
const User = require("../models/User");
const Group = require("../models/Group");
const Post = require("../models/Post");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
// clean post
const clearDatabase = async () => {
  try {
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

describe("get posts", () => {
  test("get all posts", async () => {
    request(webapp)
      .get("/api/post")
      .expect(200)
      .then((response) => {
        const posts = response.body;
        expect(posts.length).not.toBe(0);
      });
  });
});

describe("create, get, update post", () => {
  test("create post", async () => {
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
    const res = await request(webapp).post("/api/post/").send({
      title: "testpost",
      content: "hello world",
      group_id: groupId,
      author_id: userId,
    });
    expect(res.status).toBe(201);

    // get post by id
    const g_id = await res.body._id;
    const res2 = await request(webapp).get(`/api/post/${g_id}`);
    expect(res2.status).toBe(200);

    // update post by id
    const res3 = await request(webapp).put(`/api/post/${g_id}`).send({
      _id: g_id,
      content: "mad world",
    });
    expect(res3.status).toBe(200);

    // mark a post for deletion
    const res4 = await request(webapp).put(`/api/post/flag/${g_id}`).send({
      _id: g_id,
      flag_for_deletion: true,
    });
    expect(res4.status).toBe(200);
  });
});