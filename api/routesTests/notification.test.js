const request = require("supertest");
const dbLib = require("../DBOperations/notifications");
const Notification = require("../models/Notification");
const DBConnection = require("../DBOperationsTests/connect");
const webapp = require("../app");

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    await dbLib.deleteOne({ content: "test" });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Notification);
});

describe("Endpoint API & integration tests", () => {
  // test data
  const testNotification = {
    sender_id: "61bd74841a25ef8e46b28d22",
    content: "test",
  };

  test("add a new notification", async () => {
    await request(webapp)
      .post("/api/notification/")
      .send(testNotification)
      .expect(201)
      .then((response) => {
        const notification = response.body;
        expect(notification.content).toEqual(testNotification.content);
      });
  });

  // test("get all notifications", () =>
  //   request(webapp)
  //     .get("/api/notifications")
  //     .expect(200)
  //     .then((response) => {
  //       const notifications = response.body;
  //       expect(notifications.length).not.toEqual(0); // not
  //     }));

  // test("get notification by id", async () => {
  //   const insertedUser = await Player.create(testPlayer);
  //   request(webapp)
  //     .get(`/player/${insertedUser.id}`)
  //     .expect(200)
  //     .then((response) => {
  //       const player = response.body;
  //       expect(player.length).not.toEqual(0);
  //     });
  // });

  // test("Endpoint status code get player by id missing id", async () => {
  //   request(webapp)
  //     .get("/player/123")
  //     .expect(404)
  //     .then((response) => {
  //       expect(JSON.parse(response.text).error).toContain(
  //         "Error getting the player by its id"
  //       );
  //     });
  // });

  // test("Endpoint status code and response for delete player by id", async () => {
  //   const insertedUser = await Player.create(testPlayer);
  //   request(webapp)
  //     .delete(`/player/${insertedUser.id}`)
  //     .expect(200)
  //     .then((response) => {
  //       const player = response.body;
  //       expect(player.length).not.toEqual(0);
  //     });
  // });

  // test("delete player by id error", async () => {
  //   request(webapp)
  //     .delete("/player/12321")
  //     .expect(404)
  //     .then((response) => {
  //       expect(JSON.parse(response.text).error).toContain("Error");
  //     });
  // });

  // test("Endpoint status code and response for get leaders", async () => {
  //   await Player.create(testPlayer);
  //   request(webapp)
  //     .get("/leaders/1")
  //     .expect(200)
  //     .then((response) => {
  //       const player = response.body;
  //       expect(player.length).toEqual(1);
  //     });
  // });

  // test("get leaders bad number", async () => {
  //   await request(webapp)
  //     .get("/leaders/abc")
  //     .expect(400)
  //     .then((response) => {
  //       expect(JSON.parse(response.text).error).toContain("bad number");
  //     });
  // });

  // test("Endpoint status code and response for update player", async () => {
  //   const insertedUser = await Player.create(testPlayer);
  //   await request(webapp)
  //     .put(`/player/${insertedUser.id}`)
  //     .send("name=testuser&points=10&maxpoints=10")
  //     .expect(200)
  //     .then((response) => {
  //       const result = response.body;
  //       expect(result.matchedCount).toEqual(1);
  //     });
  // });

  // test("put error", () =>
  //   request(webapp)
  //     .put("/player/123")
  //     .send("name=testuser")
  //     .expect(400) // testing the response status code
  //     .then((response) => {
  //       expect(JSON.parse(response.text).error).toBe(
  //         "invalid input,object invalid"
  //       );
  //     }));
});
