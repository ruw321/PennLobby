// get all posts
module.exports.getPosts = async (collection) => {
  try {
    const posts = await collection.find({});
    return posts;
  } catch (err) {
    throw new Error(`Error getting all the posts: ${err.message}`);
  }
};
