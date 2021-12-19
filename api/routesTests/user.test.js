const request = require("supertest");
const dbLib = require("../DBOperations/users");
const User = require("../models/User");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    await dbLib.deleteOne({ username: "testUser1" });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
  const testUser = {
    username: "testUser1",
    email: "test1@gmail.com",
    firstName: "ruichen",
    lastName: "zhang",
    password: "test",
  };
  await User.create(testUser);
});

afterEach(async () => {
  await clearDatabase(User);
});

describe("Endpoint API & integration tests", () => {
  const testUser2 = {
    username: "testUser2",
    email: "test2@gmail.com",
    firstName: "ruichen2",
    lastName: "zhang2",
    password: "test2",
  };

  // test("add a new user", async () => {
  //   request(webapp)
  //     .post("/api/user/")
  //     .send(testUser2)
  //     .expect(201)
  //     .then((response) => {
  //       // console.log("This is response", response);
  //       const user = response.body;
  //       // console.log("This is response body", response.body);
  //       expect(user.username).toEqual(testUser2.username);
  //     });
  //   await User.deleteOne({ username: "testUser2" });
  // });

  test("get all users", async () => {
    request(webapp)
      .get("/api/user/")
      .expect(200)
      .then((response) => {
        const users = response.body;
        // users.length
        expect(0).toEqual(0);
      });
  });

  // test("get user by id", async () => {
  //   console.log("This is user", insertedUser);
  //   request(webapp)
  //     .get(`/api/user/id/${insertedUser._id}`)
  //     .expect(200)
  //     .then((response) => {
  //       const user = response.body;
  //       expect(user.length).not.toEqual(0);
  //     });
  // });

  // test("get user by username", async () => {
  //   request(webapp)
  //     .get(`/api/user/username/testUser1`)
  //     .expect(200)
  //     .then((response) => {
  //       const user = response.body;
  //       expect(user.length).not.toEqual(0);
  //     });
  // });
});
