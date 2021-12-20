/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const dbLib = require('../DBOperations/users');
const User = require('../models/User');
const DBConnection = require('./connect');

// clean up the database after each test
const clearDatabase = async (Model) => {
  try {
    await Model.deleteOne({ username: 'testUser' });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(User);
});

describe('Database operations tests', () => {
  // test data
  const testUser = {
    username: 'testUser',
    email: 'test@gmail.com',
    firstName: 'ruichen',
    lastName: 'zhang',
    password: 'test',
  };

  test('addUser successful', async () => {
    await dbLib.addUser(User, testUser);
    const insertedUser = await User.findOne({ username: 'testUser' });
    expect(insertedUser.username).toEqual('testUser');
  });

  test('addUser exception', async () => {
    try {
      await dbLib.addUser(User, testUser.username);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getUsers successful', async () => {
    await dbLib.addUser(User, testUser);
    await dbLib.getUsers(User);
    const users = await dbLib.getUsers(User);
    expect(users.length).not.toEqual(0);
  });

  test('getUsers exception', async () => {
    const user = null;
    try {
      await dbLib.addUser(User, testUser);
      await dbLib.getUsers(user);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getUserbyEmail successful', async () => {
    await dbLib.addUser(User, testUser);
    const user = await dbLib.getUserbyEmail(User, testUser.email);
    expect(user.length).not.toEqual(0);
  });

  test('getUserbyEmail exception', async () => {
    try {
      await dbLib.getUserbyEmail(User, 'badEmail');
    } catch (err) {
      expect(err.message).toContain('Error getting the user by email');
    }
  });

  test('getUserByUsername successful', async () => {
    await dbLib.addUser(User, testUser);
    const user = await dbLib.getUserByUsername(User, testUser.username);
    expect(user.length).not.toEqual(0);
  });

  test('getUserByUsername exception', async () => {
    try {
      await dbLib.getUserByUsername(User, 'badUsername');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getUserById successful', async () => {
    const user = await dbLib.addUser(User, testUser);
    const user2 = await dbLib.getUserById(User, user._id);
    expect(user2.length).not.toEqual(0);
  });

  test('getUserById exception', async () => {
    try {
      await dbLib.getUserById(User, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('deleteUserById successful', async () => {
    const result = await dbLib.addUser(User, testUser);
    const result2 = await dbLib.deleteUserById(User, result._id);
    expect(result2.deletedCount).toEqual(1);
  });

  test('deleteUserById exception', async () => {
    try {
      await dbLib.deleteUserById(User, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  // test("updateUserById successful", async () => {
  //   const user = await dbLib.addUser(User, testUser);
  //   const updatedUser = {
  //     username: "testUser2",
  //   };
  //   await dbLib.updateUserById(User, user._id, updatedUser);
  //   const updatedResult = await dbLib.getUserById(User, user._id);
  //   await dbLib.deleteUserById(User, updatedResult._id);
  //   expect(updatedResult.username).toEqual("testUser2");
  // });

  test('updateUserById exception', async () => {
    try {
      await dbLib.updateUserById(User, 'badId', 'badObject');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  // test("changePassword successful", async () => {
  //   const user = await dbLib.addUser(User, testUser);
  //   const newPass = "fakePassword";
  //   await dbLib.changePassword(User, user._id, newPass);
  //   const updatedResult = await dbLib.getUserById(User, user._id);
  //   // await dbLib.deleteUserById(User, updatedResult._id);
  //   expect(updatedResult.password).not.toEqual(0);
  // });

  test('changePassword exception', async () => {
    try {
      await dbLib.changePassword(User, 'badId', 'badPass');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });
});
