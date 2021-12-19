/* eslint-disable no-console */
const dbLib = require("../DBOperations/notifications");
const Notification = require("../models/Notification");
const DBConnection = require("./connect");

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    await dbLib.deleteOne({ content: "test" });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

afterEach(async () => {
  await clearDatabase(Notification);
});

describe("Database operations tests", () => {
  // test data
  const testNotification = {
    sender_id: "61bd73c71a25ef8e46b28d03",
    content: "test",
  };

  test("addNotification successful", async () => {
    await DBConnection.connect();
    await dbLib.addNotification(Notification, testNotification);
    const insertedNotification = await Notification.findOne({
      content: "test",
    });
    expect(insertedNotification.content).toEqual("test");
  });

  test("addNotification exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.addNotification(Notification, testNotification.content);
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("getNotifications successful", async () => {
    await DBConnection.connect();
    await dbLib.addNotification(Notification, testNotification);
    const notifications = await dbLib.getNotifications(Notification);
    expect(notifications.length).not.toEqual(0);
  });

  test("getNotifications exception", async () => {
    await DBConnection.connect();
    const notification = null;
    try {
      await dbLib.addNotification(Notification, testNotification);
      await dbLib.getNotifications(notification);
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("getNotificationById successful", async () => {
    await DBConnection.connect();
    const notification = await dbLib.addNotification(
      Notification,
      testNotification
    );
    const notification2 = await dbLib.getNotificationById(
      Notification,
      notification._id
    );
    expect(notification2.length).not.toEqual(0);
  });

  test("getNotificationById exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.getNotificationById(Notification, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("deleteNotificationById successful", async () => {
    await DBConnection.connect();
    const result = await dbLib.addNotification(Notification, testNotification);
    const result2 = await dbLib.deleteNotificationById(
      Notification,
      result._id
    );
    expect(result2.deletedCount).toEqual(1);
  });

  test("deleteNotificationById exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.deleteNotificationById(Notification, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  // test("deleteNotificationByReceiver successful", async () => {
  //   await DBConnection.connect();
  //   const result = await dbLib.addNotification(Notification, testNotification);
  //   const result2 = await dbLib.deleteNotificationByReceiver(Notification, result.receiver_ids[0]);
  //   expect(result2.deletedCount).toEqual(1);
  // });

  test("deleteNotificationByReceiver exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.deleteNotificationByReceiver(Notification, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("updateNotificationById successful", async () => {
    await DBConnection.connect();
    const notification = await dbLib.addNotification(
      Notification,
      testNotification
    );
    const updatedNotification = {
      content: "testNotification2",
    };
    await dbLib.updateNotificationById(
      Notification,
      notification._id,
      updatedNotification
    );
    const updatedResult = await dbLib.getNotificationById(
      Notification,
      notification._id
    );
    await dbLib.deleteNotificationById(Notification, updatedResult._id);
    expect(updatedResult.content).toEqual("testNotification2");
  });

  test("updateNotificationById exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.updateNotificationById(Notification, "badId", "badObject");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });
});
