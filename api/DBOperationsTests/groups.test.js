/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const dbLib = require('../DBOperations/groups');
const Group = require('../models/Group');
const DBConnection = require('./connect');

// clean up the database after each test
const clearDatabase = async (Model) => {
  try {
    await Model.deleteOne({ name: 'testGroup' });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Group);
});

describe('Database operations tests', () => {
  // test data
  const testGroup = {
    name: 'testGroup',
    owner: '61bfaebcf5521300169eae37',
    type: 'public',
    description: 'This is a test group',
  };

  test('addGroup successful', async () => {
    await dbLib.addGroup(Group, testGroup);
    const insertedGroup = await Group.findOne({ name: 'testGroup' });
    expect(insertedGroup.name).toEqual('testGroup');
  });

  test('addGroup exception', async () => {
    try {
      await dbLib.addGroup(Group, testGroup.name);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getGroups successful', async () => {
    await dbLib.addGroup(Group, testGroup);
    const groups = await dbLib.getGroups(Group);
    expect(groups.length).not.toEqual(0);
  });

  test('getGroups exception', async () => {
    const group = null;
    try {
      await dbLib.addGroup(Group, testGroup);
      await dbLib.getGroups(group);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getPublicGroups successful', async () => {
    await dbLib.addGroup(Group, testGroup);
    const groups = await dbLib.getPublicGroups(Group);
    expect(groups.length).not.toEqual(0);
  });

  test('getPublicGroups exception', async () => {
    const group = null;
    try {
      await dbLib.addGroup(Group, testGroup);
      await dbLib.getPublicGroups(group);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getGroupById successful', async () => {
    const group = await dbLib.addGroup(Group, testGroup);
    const group2 = await dbLib.getGroupById(Group, group._id);
    expect(group2.length).not.toEqual(0);
  });

  test('getGroupById exception', async () => {
    try {
      await dbLib.addGroup(Group, testGroup);
      await dbLib.getGroupById(Group, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getGroupByName successful', async () => {
    const group = await dbLib.addGroup(Group, testGroup);
    const group2 = await dbLib.getGroupByName(Group, group.name);
    expect(group2.length).not.toEqual(0);
  });

  test('getGroupByName exception', async () => {
    try {
      await dbLib.addGroup(Group, testGroup);
      await dbLib.getGroupByName(Group, 'badName');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('deleteGroupById successful', async () => {
    const result = await dbLib.addGroup(Group, testGroup);
    const result2 = await dbLib.deleteGroupById(Group, result._id);
    expect(result2.deletedCount).toEqual(1);
  });

  test('deleteGroupById exception', async () => {
    try {
      await dbLib.addGroup(Group, testGroup);
      await dbLib.deleteGroupById(Group, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('deleteGroupByOwner successful', async () => {
    const result = await dbLib.addGroup(Group, testGroup);
    const result2 = await dbLib.deleteGroupByOwner(Group, result.owner);
    expect(result2.deletedCount).not.toEqual(0);
  });

  test('deleteGroupByOwner exception', async () => {
    try {
      await dbLib.addGroup(Group, testGroup);
      await dbLib.deleteGroupByOwner(Group, 'badOwner');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('updateGroupById successful', async () => {
    const group = await dbLib.addGroup(Group, testGroup);
    const updatedGroup = {
      name: 'testGroup2',
    };
    await dbLib.updateGroupById(Group, group._id, updatedGroup);
    const updatedResult = await dbLib.getGroupById(Group, group._id);
    await dbLib.deleteGroupById(Group, updatedResult._id);
    expect(updatedResult.name).toEqual('testGroup2');
  });

  test('updateGroupById exception', async () => {
    try {
      await dbLib.addGroup(Group, testGroup);
      await dbLib.updateGroupById(Group, 'badId', 'badObject');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });
});
