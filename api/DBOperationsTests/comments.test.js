/* eslint-disable no-console */
const dbLib = require("../DBOperations/comments");
const Comment = require("../models/Comment");
const DBConnection = require("./connect");

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    await dbLib.deleteOne({ content: "test comment" });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Comment);
});

describe("Database operations tests", () => {
  // test data
  const testComment = {
    post_id: "61bfaf2e250f00001636b715",
    author_id: "61bd73c71a25ef8e46b28d04",
    content: "test comment",
  };

  test("addComment successful", async () => {
    await dbLib.addComment(Comment, testComment);
    const insertedComment = await Comment.findOne({ content: "test comment" });
    expect(insertedComment.content).toEqual("test comment");
  });

  test("addComment exception", async () => {
    try {
      await dbLib.addComment(Comment, testComment.content);
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("getComments successful", async () => {
    await dbLib.addComment(Comment, testComment);
    const comments = await dbLib.getComments(Comment);
    expect(comments.length).not.toEqual(0);
  });

  test("getComments exception", async () => {
    const comment = null;
    try {
      await dbLib.addComment(Comment, testComment);
      await dbLib.getComments(comment);
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("getCommentById successful", async () => {
    const comment = await dbLib.addComment(Comment, testComment);
    const comment2 = await dbLib.getCommentById(Comment, comment._id);
    expect(comment2.length).not.toEqual(0);
  });

  test("getCommentById exception", async () => {
    try {
      await dbLib.getCommentById(Comment, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("deleteCommentById successful", async () => {
    const result = await dbLib.addComment(Comment, testComment);
    const result2 = await dbLib.deleteCommentById(Comment, result._id);
    expect(result2.deletedCount).toEqual(1);
  });

  test("deleteCommentById exception", async () => {
    try {
      await dbLib.deleteCommentById(Comment, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  // test("deleteCommentByAuthor successful", async () => {
  //   const result = await dbLib.addComment(Comment, testComment);
  //   const result2 = await dbLib.deleteCommentByAuthor(Comment, result.author_id);
  //   expect(result2.deletedCount).toEqual(1);
  // });

  test("deleteCommentByAuthor exception", async () => {
    try {
      await dbLib.deleteCommentByAuthor(Comment, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("updateCommentById successful", async () => {
    const comment = await dbLib.addComment(Comment, testComment);
    const updatedComment = {
      content: "testComment2",
    };
    await dbLib.updateCommentById(Comment, comment._id, updatedComment);
    const updatedResult = await dbLib.getCommentById(Comment, comment._id);
    await dbLib.deleteCommentById(Comment, updatedResult._id);
    expect(updatedResult.content).toEqual("testComment2");
  });

  test("updateCommentById exception", async () => {
    try {
      await dbLib.updateCommentById(Comment, "badId", "badObject");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });
});
