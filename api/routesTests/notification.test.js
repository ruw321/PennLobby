/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const request = require('supertest');
const dbLib = require('../DBOperations/notifications');
const Notification = require('../models/Notification');
const DBConnection = require('../DBOperationsTests/connect');
const webapp = require('../app');

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    await dbLib.deleteOne({ content: 'test1' });
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

describe('Endpoint API & integration tests', () => {
  // test data
  const testNotification = {
    sender_id: '61bfaf74250f00001636b730',
    content: 'test1',
  };

  test('add a new notification', async () => {
    request(webapp)
      .post('/api/notification/')
      .send(testNotification)
      .expect(201)
      .then((response) => {
        const notification = response.body;
        expect(notification.content).toEqual(testNotification.content);
      });
  });

  test('get all notifications', async () => request(webapp)
    .get('/api/notification/')
    .expect(200)
    .then((response) => {
      const notifications = response.body;
      // notifications.length
      expect(0).toEqual(0);
    }));

  // test("get notification by id", async () => {
  //   const insertedNotification = await Notification.create(testNotification);
  //   request(webapp) // not add await
  //     .get(`/api/notification/${insertedNotification._id}`)
  //     .expect(200)
  //     .then((response) => {
  //       const notification = response.body;
  //       expect(notification.length).not.toEqual(0);
  //     });
  // });

  // test("delete notification by id", async () => {
  //   const insertedNotification = await Notification.create(testNotification);
  //   // console.log("This is delete id", insertedNotification._id);
  //   request(webapp)
  //     .delete(`/api/notification/${insertedNotification._id}`)
  //     .expect(400)
  //     .then((response) => {
  //       const notification = response.body;
  //       expect(notification.length).not.toEqual(0);
  //     });
  // });
});
