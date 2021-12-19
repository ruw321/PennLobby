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

afterEach(async () => {
  await clearDatabase(Comment);
});

describe("Database operations tests", () => {
  // test data
  const testComment = {
    post_id: "61bcf100b497db77bd85cbff",
    author_id: "61bcee5f57e7c375f1864081",
    content: "test comment",
  };

  test("addComment successful", async () => {
    await DBConnection.connect();
    await dbLib.addComment(Comment, testComment);
    const insertedComment = await Comment.findOne({ content: "test comment" });
    expect(insertedComment.content).toEqual("test comment");
  });

  test("addComment exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.addComment(Comment, testComment.content);
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("getComments successful", async () => {
    await DBConnection.connect();
    await dbLib.addComment(Comment, testComment);
    const comments = await dbLib.getComments(Comment);
    expect(comments.length).not.toEqual(0);
  });

  test("getComments exception", async () => {
    await DBConnection.connect();
    const comment = null;
    try {
      await dbLib.addComment(Comment, testComment);
      await dbLib.getComments(comment);
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("getCommentById successful", async () => {
    await DBConnection.connect();
    const comment = await dbLib.addComment(Comment, testComment);
    const comment2 = await dbLib.getCommentById(Comment, comment._id);
    expect(comment2.length).not.toEqual(0);
  });

  test("getCommentById exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.getCommentById(Comment, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("deleteCommentById successful", async () => {
    await DBConnection.connect();
    const result = await dbLib.addComment(Comment, testComment);
    const result2 = await dbLib.deleteCommentById(Comment, result._id);
    expect(result2.deletedCount).toEqual(1);
  });

  test("deleteCommentById exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.deleteCommentById(Comment, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  // test("deleteCommentByAuthor successful", async () => {
  //   await DBConnection.connect();
  //   const result = await dbLib.addComment(Comment, testComment);
  //   const result2 = await dbLib.deleteCommentByAuthor(Comment, result.author_id);
  //   expect(result2.deletedCount).toEqual(1);
  // });

  test("deleteCommentByAuthor exception", async () => {
    await DBConnection.connect();
    try {
      await dbLib.deleteCommentByAuthor(Comment, "badId");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });

  test("updateCommentById successful", async () => {
    await DBConnection.connect();
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
    await DBConnection.connect();
    try {
      await dbLib.updateCommentById(Comment, "badId", "badObject");
    } catch (err) {
      expect(err.message).toContain("Error");
    }
  });
});
