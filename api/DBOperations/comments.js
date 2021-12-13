// get all comments
module.exports.getComments = async (collection) => {
  try {
    const comments = await collection.find({});
    return comments;
  } catch (err) {
    throw new Error(`Error getting all the comments: ${err.message}`);
  }
};

// get comment by id
module.exports.getCommentById = async (collection, ID) => {
  try {
    const comment = await collection.findOne({ id: ID });
    return comment;
  } catch (err) {
    throw new Error(`Error getting the comment by id: ${err.message}`);
  }
};

// add a new comment
module.exports.addComment = async (collection, commentObject) => {
  try {
    const result = await collection.create(commentObject);
    return result;
  } catch (err) {
    throw new Error(`Error adding the comment: ${err.message}`);
  }
};

// delete comment by id
module.exports.deleteCommentById = async (collection, ID) => {
  try {
    const comment = await collection.deleteOne({ id: ID });
    return comment;
  } catch (err) {
    throw new Error(`Error deleting the comment by id: ${err.message}`);
  }
};

// delete comment by author
module.exports.deleteCommentByAuthor = async (collection, userID) => {
  try {
    const res = await collection.deleteMany({ author_id: userID });
    return res;
  } catch (err) {
    throw new Error(`Error deleting the comment by author: ${err.message}`);
  }
};

// update comment by id
module.exports.updateCommentById = async (collection, ID, updatedObject) => {
  try {
    const response = await collection.updateOne(
      { _id: ID },
      { $set: updatedObject }
    );
    return response;
  } catch (err) {
    throw new Error(`Error updating the comment by id: ${err.message}`);
  }
};