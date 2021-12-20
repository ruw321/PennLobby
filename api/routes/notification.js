/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const Ajv = require('ajv');
const Users = require('../DBOperations/users');
const Notifications = require('../DBOperations/notifications');
const User = require('../models/User');
const Notification = require('../models/Notification');

const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: 'object',
  properties: {
    content: { type: 'string' },
    sender_id: { type: 'string' },
    receiver_ids: { type: 'array' },
  },
  required: ['content', 'sender_id'],
};

// add a new notification
router.route('/').post(async (req, res) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
    return;
  }
  try {
    const notification = await Notifications.addNotification(
      Notification,
      req.body,
    );
    notification.receiver_ids.forEach(async (r_id) => {
      const user = await Users.getUserById(User, r_id);
      const userNotificationIds = user.notification_ids;
      userNotificationIds.push(notification._id);
      await Users.updateUserById(User, r_id, {
        notification_ids: userNotificationIds,
      });
    });
    res.status(201).send(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get all notifications
router.route('/').get(async (req, res) => {
  try {
    const notifications = await Notifications.getNotifications(Notification);
    res.status(200).send(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get notifications by receiver's user id
router.route('/:receiverId').get(async (req, res) => {
  try {
    const user = await Users.getUserById(User, req.params.receiverId);
    const notifications = user.notification_ids;
    res.status(200).send(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a notification by notification id
router.route('/:notificationId').delete(async (req, res) => {
  try {
    const notification = await Notifications.getNotificationById(
      Notification,
      req.params.notificationId,
    );
    const receivers = notification.receiver_ids;
    for (let i = 0; i < receivers.length; i++) {
      const receiver = await Users.getUserById(User, receivers[i]);
      const receiverNotificationIds = receiver.notification_ids.filter(
        (id) => id != req.params.notificationId,
      );
      await Users.updateUserById(User, receivers[i], {
        notification_ids: receiverNotificationIds,
      });
    }
    await Notifications.deleteNotificationById(
      Notification,
      req.params.notificationId,
    );
    res.status(200).send(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
