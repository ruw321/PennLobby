const request = require("supertest");
const Users = require("../DBOperations/users");
const User = require("../models/User");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (User) => {
  try {
    await User.deleteOne({ username: "testUser1" });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(User);
});

describe("Endpoint API & integration tests", () => {
  const testUser = {
    username: "testUser1",
    email: "test1@gmail.com",
    firstName: "ruichen",
    lastName: "zhang",
    password: "test",
  };

  test("add a new user", async () => {
    request(webapp)
      .post("/api/user/")
      .send(testUser)
      .expect(201)
      .then((response) => {
        const user = response.body;
        expect(user.username).toEqual(testUser.username);
      });
  });

  test('get all users', async () => {
    request(webapp)
      .get('/api/user/')
      .expect(200)
      .then((response) => {
        const users = response.body;
        expect(users.length).not.toEqual(0);
      });
  });

  test("get user by id", async () => {
    // const users = await User.find({});
    // console.log("haha", users);
    // const insertedUser = await Users.addUser(User, testUser);
    // const insertedUser = await User.create(testUser);
    // console.log("haha", insertedUser);
    request(webapp)
      .get("/api/user/id/61bfaebcf5521300169eae37")
      .expect(200)
      .then((response) => {
        const user = response.body;
        expect(user.length).not.toEqual(0);
      });
  });

  test("get user by username", async () => {
    request(webapp)
      .get("/api/user/username/t")
      .expect(200)
      .then((response) => {
        const user = response.body;
        expect(user.length).not.toEqual(0);
      });
  });

  // test("get user by email", async () => {
  //   const insertedUser = await Users.addUser(User, testUser);
  //   const email = "t@gmail.com";
  //   request(webapp)
  //     .get(`/api/user/email/${email}`)
  //     .expect(200)
  //     .then((response) => {
  //       const user = response.body;
  //       expect(user.length).not.toEqual(0);
  //     });
  // });

    // test("update user by id", async () => {
    //   await request(webapp)
    //     .put(`/player/${insertedUser.id}`)
    //     .send("name=testuser&points=10&maxpoints=10")
    //     .expect(200)
    //     .then((response) => {
    //       const result = response.body;
    //       expect(result.matchedCount).toEqual(1);
    //     });
    // });

  // test("delete user by id", async () => {
  //   const insertedUser = await Users.addUser(User, testUser);
  //   // console.log("This is user id", insertedUser._id);
  //   request(webapp)
  //     .delete(`/api/user/${insertedUser._id}`)
  //     .expect(400)
  //     .then((response) => {
  //       const user = response.body;
  //       expect(user.length).not.toEqual(0);
  //     });
  // });
});
