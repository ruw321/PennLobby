// get all topics
module.exports.getTopics = async (collection) => {
  try {
    const topics = await collection.find({});
    return topics;
  } catch (err) {
    throw new Error(`Error getting all the topics: ${err.message}`);
  }
};
