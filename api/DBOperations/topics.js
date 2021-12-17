// get all topics
module.exports.getTopics = async (collection) => {
  try {
    const topics = await collection.find({});
    return topics;
  } catch (err) {
    throw new Error(`Error getting all the topics: ${err.message}`);
  }
};

// get topic by id
module.exports.getTopicById = async (collection, ID) => {
  try {
    const topic = await collection.findOne({ id: ID });
    return topic;
  } catch (err) {
    throw new Error(`Error getting the topic by id: ${err.message}`);
  }
};

// get topic by name
module.exports.getTopicByName = async (collection, inputName) => {
  try {
    const topic = await collection.findOne({ name: inputName });
    return topic;
  } catch (err) {
    throw new Error(`Error getting the topic by name: ${err.message}`);
  }
};

// add a new topic
module.exports.addTopic = async (collection, topicObject) => {
  try {
    const result = await collection.create(topicObject);
    return result;
  } catch (err) {
    throw new Error(`Error adding the topic: ${err.message}`);
  }
};

// delete topic by id
module.exports.deleteTopicById = async (collection, ID) => {
  try {
    const topic = await collection.deleteOne({ id: ID });
    return topic;
  } catch (err) {
    throw new Error(`Error deleting the topic by id: ${err.message}`);
  }
};

// update topic by id
module.exports.updateTopicById = async (collection, ID, updatedObject) => {
  try {
    const response = await collection.updateOne(
      { _id: ID },
      { $set: updatedObject }
    );
    return response;
  } catch (err) {
    throw new Error(`Error updating the topic by id: ${err.message}`);
  }
};

// add a group id to a topic
module.exports.addGroupIDToTopic = async (collection, groupID, topicID) => {
  try {
    const response = await collection.updateOne(
      { _id: topicID },
      { $push: { group_ids: groupID } },
    );
    return response;
  } catch (err) {
    throw new Error(`Error updating the topic by id: ${err.message}`);
  }
};