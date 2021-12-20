// get all notifications
module.exports.getNotifications = async (collection) => {
  try {
    const notifications = await collection.find({});
    return notifications;
  } catch (err) {
    throw new Error(`Error getting all the notifications: ${err.message}`);
  }
};

// get notification by id
module.exports.getNotificationById = async (collection, ID) => {
  try {
    const notification = await collection.findOne({ _id: ID });
    return notification;
  } catch (err) {
    throw new Error(`Error getting the notification by id: ${err.message}`);
  }
};

// add a new notification
module.exports.addNotification = async (collection, notificationObject) => {
  try {
    const result = await collection.create(notificationObject);
    return result;
  } catch (err) {
    throw new Error(`Error adding the notification: ${err.message}`);
  }
};

// delete notification by id
module.exports.deleteNotificationById = async (collection, ID) => {
  try {
    const notification = await collection.deleteOne({ _id: ID });
    return notification;
  } catch (err) {
    throw new Error(`Error deleting the notification by id: ${err.message}`);
  }
};

// delete notification by receiver
module.exports.deleteNotificationByReceiver = async (collection, authorID) => {
  try {
    const res = await collection.deleteMany({ author_id: authorID });
    return res;
  } catch (err) {
    throw new Error(
      `Error deleting the notification by author: ${err.message}`,
    );
  }
};

// update notification by id
module.exports.updateNotificationById = async (collection, ID, updatedObject) => {
  try {
    const response = await collection.updateOne(
      { _id: ID },
      { $set: updatedObject },
    );
    return response;
  } catch (err) {
    throw new Error(`Error updating the notification by id: ${err.message}`);
  }
};
