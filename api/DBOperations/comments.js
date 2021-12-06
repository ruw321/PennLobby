// get all comments
module.exports.getComments = async (collection) => {
  try {
    const comments = await collection.find({});
    return comments;
  } catch (err) {
    throw new Error(`Error getting all the comments: ${err.message}`);
  }
};
