/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const dbLib = require('../DBOperations/topics');
const Topic = require('../models/Topic');
const DBConnection = require('./connect');

// clean up the database after each test
const clearDatabase = async (dbLib) => {
  try {
    await dbLib.deleteOne({ name: 'test' });
  } catch (err) {
    throw new Error(`Error clearing the database: ${err.message}`);
  }
};

beforeAll(async () => {
  await DBConnection.connect();
});

afterEach(async () => {
  await clearDatabase(Topic);
});

describe('Database operations tests', () => {
  // test data
  const testTopic = {
    name: 'test',
    group_ids: [],
  };

  test('addTopic successful', async () => {
    await dbLib.addTopic(Topic, testTopic);
    const insertedTopic = await Topic.findOne({ name: 'test' });
    expect(insertedTopic.name).toEqual('test');
  });

  test('addTopic exception', async () => {
    try {
      await dbLib.addTopic(Topic, testTopic.name);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getTopics successful', async () => {
    await dbLib.addTopic(Topic, testTopic);
    await dbLib.getTopics(Topic);
    const topics = await dbLib.getTopics(Topic);
    expect(topics.length).not.toEqual(0);
  });

  test('getTopics exception', async () => {
    const topic = null;
    try {
      await dbLib.addTopic(Topic, testTopic);
      await dbLib.getTopics(topic);
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getTopicbyName successful', async () => {
    await dbLib.addTopic(Topic, testTopic);
    const topic = await dbLib.getTopicByName(Topic, testTopic.name);
    expect(topic.length).not.toEqual(0);
  });

  test('getTopicByName exception', async () => {
    try {
      await dbLib.getTopicByName(Topic, 'badName');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('getTopicbyId successful', async () => {
    await dbLib.addTopic(Topic, testTopic);
    const result = await dbLib.getTopicByName(Topic, testTopic.name);
    const result2 = await dbLib.getTopicById(Topic, result._id);
    expect(result2.length).not.toEqual(0);
  });

  test('getTopicById exception', async () => {
    try {
      await dbLib.getTopicById(Topic, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('deleteTopicById successful', async () => {
    const result = await dbLib.addTopic(Topic, testTopic);
    const result2 = await dbLib.deleteTopicById(Topic, result._id);
    expect(result2.deletedCount).toEqual(1);
  });

  test('deleteTopicById exception', async () => {
    try {
      await dbLib.deleteTopicById(Topic, 'badId');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('updateTopic successful', async () => {
    const topic = await dbLib.addTopic(Topic, testTopic);
    const updatedTopic = {
      name: 'test2',
    };
    await dbLib.updateTopicById(Topic, topic._id, updatedTopic);
    const updatedResult = await dbLib.getTopicById(Topic, topic._id);
    await dbLib.deleteTopicById(Topic, updatedResult._id);
    expect(updatedResult.name).toEqual('test2');
  });

  test('updateTopicById exception', async () => {
    try {
      await dbLib.updateTopicById(Topic, 'badId', 'badObject');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });

  test('addGroupIDToTopic successful', async () => {
    const topic = await dbLib.addTopic(Topic, testTopic);
    await dbLib.addGroupIDToTopic(Topic, '61bd83aa74b9458e24e24426', topic._id);
    const insertedTopic = await dbLib.getTopicById(Topic, topic._id);
    expect(insertedTopic.group_ids.length).toEqual(1);
  });

  test('addGroupIDToTopic exception', async () => {
    try {
      await dbLib.addGroupIDToTopic(Topic, 'badId1', 'badId2');
    } catch (err) {
      expect(err.message).toContain('Error');
    }
  });
});
