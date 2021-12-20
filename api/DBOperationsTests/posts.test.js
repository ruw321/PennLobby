/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const dbLib = require('../DBOperations/posts');
const Post = require('../models/Post');
const DBConnection = require('./connect');

// clean up the database after each test
const clearDatabase = async (Model) => {
  try {
    await Model.deleteOne({ title: 'test' });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Post);
});

describe('Database operations tests', () => {
  // test data
  const testPost = {
    title: 'test',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est',
    group_id: '61bfaed5f5521300169eae48',
    author_id: '61bfaebcf5521300169eae37',
  };

  test('addPost successful', async () => {
    await dbLib.addPost(Post, testPost);
    const insertedPost = await Post.findOne({ title: 'test' });
    expect(insertedPost.title).toEqual('test');
  });

  test('addPost exception', async () => {
    try {
      await dbLib.addPost(Post, testPost.title);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getPosts successful', async () => {
    await dbLib.addPost(Post, testPost);
    const posts = await dbLib.getPosts(Post);
    expect(posts.length).not.toEqual(0);
  });

  test('getPosts exception', async () => {
    const post = null;
    try {
      await dbLib.addPost(Post, testPost);
      await dbLib.getPosts(post);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getPostById successful', async () => {
    const post = await dbLib.addPost(Post, testPost);
    const post2 = await dbLib.getPostById(Post, post._id);
    expect(post2.length).not.toEqual(0);
  });

  test('getPostById exception', async () => {
    try {
      await dbLib.getPostById(Post, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('deletePostById successful', async () => {
    const result = await dbLib.addPost(Post, testPost);
    const result2 = await dbLib.deletePostById(Post, result._id);
    expect(result2.deletedCount).toEqual(1);
  });

  test('deletePostById exception', async () => {
    try {
      await dbLib.deletePostById(Post, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  // test("deletePostByAuthor successful", async () => {
  //   const result = await dbLib.addPost(Post, testPost);
  //   const result2 = await dbLib.deletePostByAuthor(Post, result.author_id);
  //   expect(result2.deletedCount).toEqual(1);
  // });

  test('deletePostByAuthor exception', async () => {
    try {
      await dbLib.deletePostByAuthor(Post, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('updatePostById successful', async () => {
    const post = await dbLib.addPost(Post, testPost);
    const updatedPost = {
      title: 'testPost2',
    };
    await dbLib.updatePostById(Post, post._id, updatedPost);
    const updatedResult = await dbLib.getPostById(Post, post._id);
    await dbLib.deletePostById(Post, updatedResult._id);
    expect(updatedResult.title).toEqual('testPost2');
  });

  test('updatePostById exception', async () => {
    try {
      await dbLib.updatePostById(Post, 'badId', 'badObject');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });
});
