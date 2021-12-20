/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();
const lib = require('./fetch.js');

describe('Fetch-mock: the api returned correct data', () => {
  test('check login', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
      __v: 0
    }));
    const data = await lib.login('testUser', 'testUser');
    const res = await data.json();
    expect(res.username).toBe('testUser');
  });
  
  test('check signup', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
      __v: 0
    }));
    const data = await lib.signup('testUser', 'testUser');
    const res = await data.json();
    expect(res.username).toBe('testUser');
  });

  test('check logout', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
      __v: 0
    }));
    const data = await lib.logout('testUser', 'testUser');
    const res = await data.json();
    expect(res.username).toBe('testUser');
  });

  test('check getUserbyUsername', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
      __v: 0
    }));
    const data = await lib.getUserbyUsername('testUser');
    const res = await data.json();
    expect(res.username).toBe('testUser');
  });
  
  test('check userChangePassword', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "testpswd",
      __v: 0
    }));
    const data = await lib.userChangePassword('61bfb2a9250f00001636b9e0', 'testpswd');
    const res = await data.json();
    expect(res.password).toBe('testpswd');
  });

  test('check deactivateAccount', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
      __v: 0
    }));
    const data = await lib.deactivateAccount('61bfb2a9250f00001636b9e0');
    const res = await data.json();
    expect(res.username).toBe('testUser');
  });

  test('check getAllUsers', async () => {
    fetch.mockResponse(JSON.stringify([{
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
      __v: 0
    }]));
    const data = await lib.getAllUsers();
    expect(data[0].username).toBe('testUser');
  });
  test('check updateUserById', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "testpswd",
      __v: 0
    }));
    const data = await lib.updateUserById('61bfb2a9250f00001636b9e0', {});
    const res = await data.json();
    expect(res.username).toBe('testUser');
  });
  test('check registerMessage', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "testpswd",
      __v: 0
    }));
    const data = await lib.registerMessage('testUser');
    // const res = await data.json();
    expect(data.username).toBe('testUser');
  });
  test('check postMessage', async () => {
    fetch.mockResponse({
      data: {
        message: 'success'
      }
    });
    const data = await lib.postMessage('testUser', 'testUser', 'success');
    // const res = await data.json();
    expect(data).toBe(null);
  });
  test('getS3Url', async () => {
    fetch.mockResponse(JSON.stringify({ url: 'https://penn-lobby-image-bucket.s3.us-e' }));
    const data = await lib.getS3Url();
    expect(data.url).toBe('https://penn-lobby-image-bucket.s3.us-e');
  });
  test('sendS3', async () => {
    fetch.mockResponse(JSON.stringify({ result: 'success' }));
    const data = await lib.sendS3();
    expect(data).toBe(null);
  });
  test('check getGroupByID', async () => {
    fetch.mockResponse(JSON.stringify({
      topic_ids: [],
      member_ids: [],
      post_ids: [],
      last_active: "2021-12-19T05:32:22.972Z",
      created_at: "2021-12-19T05:32:22.972Z",
      _id: "61becb16a53e51001646672d",
      name: "jaspergroup",
      owner: "61becb01a53e51001646670c",
      description: "jasper",
      type: "public",
      __v: 0
    }));
    const data = await lib.getGroupByID('61becb16a53e51001646672d');
    // const res = await data.json();
    expect(data.description).toBe('jasper');
  });
  test('check getAllGroups', async () => {
    fetch.mockResponse(JSON.stringify([{
      topic_ids: [],
      member_ids: [],
      post_ids: [],
      last_active: "2021-12-19T05:32:22.972Z",
      created_at: "2021-12-19T05:32:22.972Z",
      _id: "61becb16a53e51001646672d",
      name: "jaspergroup",
      owner: "61becb01a53e51001646670c",
      description: "jasper",
      type: "public",
      __v: 0
    }]));
    const data = await lib.getAllGroups();
    // const res = await data.json();
    expect(data[0].description).toBe('jasper');
  });
  test('check getAllPublicGroups', async () => {
    fetch.mockResponse(JSON.stringify([{
      topic_ids: [],
      member_ids: [],
      post_ids: [],
      last_active: "2021-12-19T05:32:22.972Z",
      created_at: "2021-12-19T05:32:22.972Z",
      _id: "61becb16a53e51001646672d",
      name: "jaspergroup",
      owner: "61becb01a53e51001646670c",
      description: "jasper",
      type: "public",
      __v: 0
    }]));
    const data = await lib.getAllPublicGroups();
    // const res = await data.json();
    expect(data[0].description).toBe('jasper');
  });
  test('check getAllPosts', async () => {
    fetch.mockResponse(JSON.stringify([{
      comment_ids: [
        "61bf91d1f8fdfa434c9ade75"
      ],
      created_at: "2021-12-19T05:32:22.971Z",
      flag_for_deletion: true,
      _id: "61bec9d9a53e510016466627",
      title: "test post",
      content: "see if it works",
      author_id: "61bec995a53e510016466585",
      group_id: "61bec964a53e510016466554",
      __v: 0
    }]));
    const data = await lib.getAllPosts();
    // const res = await data.json();
    expect(data[0].title).toBe('test post');
  });
  test('check getPostByID', async () => {
    fetch.mockResponse(JSON.stringify({
      comment_ids: [],
      created_at: "2021-12-19T05:32:22.971Z",
      flag_for_deletion: true,
      _id: "61bec9d9a53e510016466627",
      title: "test post",
      content: "see if it works",
      author_id: "61bec995a53e510016466585",
      group_id: "61bec964a53e510016466554",
      __v: 0
    }));
    const data = await lib.getPostByID('61bec9d9a53e510016466627');
    // const res = await data.json();
    expect(data).toBe(null);
  });
  test('check createGroup', async () => {
    fetch.mockResponse(JSON.stringify({
      comment_ids: [],
      created_at: "2021-12-19T05:32:22.971Z",
      flag_for_deletion: true,
      _id: "61bec9d9a53e510016466627",
      title: "test post",
      content: "see if it works",
      author_id: "61bec995a53e510016466585",
      group_id: "61bec964a53e510016466554",
      __v: 0
    }));
    const data = await lib.createGroup({ title: "test post", content: "see if it works" });
    const res = await data.json();
    expect(res.title).toBe("test post");
  });
  test('check joinGroup', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.joinGroup({ title: "61bec9d9a53e510016466627", content: "61bec964a53e510016466554" });
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check quitGroup', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.quitGroup({ title: "61bec9d9a53e510016466627", content: "61bec964a53e510016466554" });
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check addPost', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.addPost({
      title: 'test title',
      content: "test post",
      author_id: "61bec995a53e510016466585",
      group_id: "61bec964a53e510016466554",
    });
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check flagPostForDeletion', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.flagPostForDeletion('61bec995a53e510016466585', '61bec995a53e510016466585');
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check deletePost', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.deletePost('61bec995a53e510016466585', '61bec995a53e510016466585', '61bec995a53e510016466585');
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check addComment', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.addComment('test content', '61bec995a53e510016466585', '61bec995a53e510016466585', '61bec995a53e510016466585');
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check getAllComment', async () => {
    fetch.mockResponse(JSON.stringify([
      "61bed790a53e5100164668cd",
      "61bfaf05be1897f3945c5bfa",
      "61bfaf25be1897f3945c5c09"
    ]));
    const data = await lib.getAllComment('61becb2ca53e510016466741');
    expect(data[0]).toBe('61bed790a53e5100164668cd');
  });
  test('check deleteComment', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.deleteComment('61becb2ca53e510016466741', '61bec995a53e510016466585');
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check getAllPostsByGroupID catch', async () => {
    fetch.mockResponse(JSON.stringify({
      comment_ids: [],
      created_at: "2021-12-19T05:32:22.971Z",
      flag_for_deletion: true,
      _id: "61bec9d9a53e510016466627",
      title: "mz new post",
      content: "see if it works?",
      author_id: "61bec995a53e510016466585",
      group_id: "61bec964a53e510016466554",
      __v: 0
    }));
    const data = await lib.getAllPostsByGroupID('61becb2ca53e510016466741');
    expect(data).toBe(null);
  });
  test('check getAllPostsByUserID catch', async () => {
    fetch.mockResponse(JSON.stringify([{
      comment_ids: [],
      created_at: "2021-12-19T05:32:22.971Z",
      flag_for_deletion: true,
      _id: "61bec9d9a53e510016466627",
      title: "mz new post",
      content: "see if it works?",
      author_id: "61bec995a53e510016466585",
      group_id: "61bec964a53e510016466554",
      __v: 0
    }]));
    const data = await lib.getAllPostsByUserID('61becb2ca53e510016466741');
    expect(data).toBe(null);
  });
  test('check getCommentByID', async () => {
    fetch.mockResponse(JSON.stringify([{
      comment_ids: [],
      created_at: "2021-12-19T05:32:22.971Z",
      flag_for_deletion: true,
      _id: "61bec9d9a53e510016466627",
      title: "mz new post",
      content: "see if it works?",
      author_id: "61bec995a53e510016466585",
      group_id: "61bec964a53e510016466554",
      __v: 0
    }]));
    const data = await lib.getCommentByID('61becb2ca53e510016466741');
    expect(data[0].content).toBe('see if it works?');
  });
  test('check editComment', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.editComment('new comment', '61becb2ca53e510016466741', '61bec964a53e510016466554');
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check promoteUser', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.promoteUser('61bec995a53e510016466585', '61becb2ca53e510016466741', '61bec964a53e510016466554');
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check demoteUser', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.promoteUser('61bec964a53e510016466554', '61bec995a53e510016466585', '61becb2ca53e510016466741');
    const res = await data.json();
    expect(res.result).toBe('success');
  });
  test('check getAllTopics', async () => {
    fetch.mockResponse(JSON.stringify([
      {
        group_ids: [
          "61bcf00f4c83287793d63c9c",
        ],
        _id: "61bcefb18fd220775fca6d7d",
        name: "Sports",
        __v: 0
      }
    ]));
    const data = await lib.getAllTopics();
    expect(data[0].name).toBe('Sports');
  });
  test('check getTopicByID', async () => {
    fetch.mockResponse(JSON.stringify(
      {
        group_ids: [
          "61bcf00f4c83287793d63c9c",
        ],
        _id: "61bcefb18fd220775fca6d7d",
        name: "Sports",
        __v: 0
      }
    ));
    const data = await lib.getTopicByID('61bcefb18fd220775fca6d7d');
    expect(data.name).toBe('Sports');
  });
  test('check getTopicByName', async () => {
    fetch.mockResponse(JSON.stringify(
      {
        group_ids: [
          "61bcf00f4c83287793d63c9c",
        ],
        _id: "61bcefb18fd220775fca6d7d",
        name: "Sports",
        __v: 0
      }
    ));
    const data = await lib.getTopicByName('Sports');
    expect(data.name).toBe('Sports');
  });
  test('check getAllNotifications', async () => {
    fetch.mockResponse(JSON.stringify(
      [
        {
          receiver_ids: [
            "61bfaf74250f00001636b730"
          ],
          _id: "61bff63adae2b300160944d6",
          content: "(invite group)61bfaf80250f00001636b767(user)61bfaebcf5521300169eae37",
          sender_id: "61bfaf74250f00001636b730",
          __v: 0
        }
      ]
    ));
    const data = await lib.getAllNotifications();
    expect(data[0].sender_id).toBe('61bfaf74250f00001636b730');
  });
  test('check getUserByID', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
      __v: 0
    }));
    const data = await lib.getUserByID('61bfb2a9250f00001636b9e0');
    expect(data.username).toBe('testUser');
  });
  test('check sendNotification', async () => {
    fetch.mockResponse(JSON.stringify(
      {
        receiver_ids: [
          "61bfaf74250f00001636b730"
        ],
        _id: "61bff63adae2b300160944d6",
        content: "(invite group)61bfaf80250f00001636b767(user)61bfaebcf5521300169eae37",
        sender_id: "61bfaf74250f00001636b730",
        __v: 0
      }
    ));
    const data = await lib.sendNotification({
      receiver_ids: [
        "61bfaf74250f00001636b730"
      ],
      content: "(invite group)61bfaf80250f00001636b767(user)61bfaebcf5521300169eae37",
      sender_id: "61bfaf74250f00001636b730",
    });
    expect(data.sender_id).toBe('61bfaf74250f00001636b730');
  });
  test('check deleteNotification', async () => {
    fetch.mockResponse(JSON.stringify({
      result: 'success'
    }));
    const data = await lib.deleteNotification('61bff63adae2b300160944d6');
    expect(data.result).toBe('success');
  });
});
