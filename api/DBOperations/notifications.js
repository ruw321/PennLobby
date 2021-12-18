// get all notifications
module.exports.getNotifications = async (collection) => {
  try {
    const posts = await collection.find({});
    return posts;
  } catch (err) {
    throw new Error(`Error getting all the posts: ${err.message}`);
  }
};

// get post by id
module.exports.getPostById = async (collection, ID) => {
  try {
    const post = await collection.findOne({ _id: ID });
    return post;
  } catch (err) {
    throw new Error(`Error getting the post by id: ${err.message}`);
  }
};

// add a new post
module.exports.addPost = async (collection, postObject) => {
  try {
    const result = await collection.create(postObject);
    return result;
  } catch (err) {
    throw new Error(`Error adding the post: ${err.message}`);
  }
};

// delete post by id (only the post owner himself or admin can delete)
module.exports.deletePostById = async (collection, ID) => {
  try {
    const post = await collection.deleteOne({ _id: ID });
    return post;
  } catch (err) {
    throw new Error(`Error deleting the post by id: ${err.message}`);
  }
};

// delete post by author
module.exports.deletePostByAuthor = async (collection, authorID) => {
  try {
    const res = await collection.deleteMany({ author_id: authorID });
    return res;
  } catch (err) {
    throw new Error(`Error deleting the post by author: ${err.message}`);
  }
};

// update post by id
module.exports.updatePostById = async (collection, ID, updatedObject) => {
  try {
    const response = await collection.updateOne(
      { _id: ID },
      { $set: updatedObject }
    );
    return response;
  } catch (err) {
    throw new Error(`Error updating the post by id: ${err.message}`);
  }
};
