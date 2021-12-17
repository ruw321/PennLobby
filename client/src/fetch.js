/* eslint-disable space-before-blocks */
const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : '';
async function login(u, p) {
  const user = {
    username: u,
    password: p,
  };
  const data = {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  try {
    const theUrl = `${url}/auth/login/`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (e) {
    return e;
  }
}

// sign up a user
async function signup(user) {
  const data = {
    credentials: "include",
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  try {
    const theUrl = `${url}/api/user/`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (e) {
    return e;
  }
}

// log out a user
async function logout() {
  try {
    const theUrl = `${url}/api/user/`;
    return await fetch(theUrl);
  } catch (e) {
    return e;
  }
}

// get a user by username
async function getUserbyUsername(username) {
  try {
    const theUrl = `${url}/api/user/username/${username}`;
    const response = await fetch(theUrl);
    return response;
  } catch (e) {
    return e;
  }
}

// user changes password
async function userChangePassword(id, newPass) {
  const obj = { password: newPass };
  const data = {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    // you have to do JSON.stringify, otherwise CORS wouldnt allow it
    body: JSON.stringify(obj),
  };
  try {
    const theUrl = `${url}/api/user/password/${id}`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (e) {
    return e;
  }
}

// user deactivates account
async function deactivateAccount(id) {
  const data = {
    credentials: "include",
    method: "DELETE",
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // // you have to do JSON.stringify, otherwise CORS wouldnt allow it
    // body: JSON.stringify(obj),
  };
  try {
    const theUrl = `${url}/api/user/${id}`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (e) {
    return e;
  }
}

// get all users
async function getAllUsers() {
  try {
    const theUrl = `${url}/api/user`;
    const result = await fetch(theUrl, { method: "GET" });
    const res = await result.json();
    return res;
  } catch (err) {
    return null;
  }
}

// update user
async function updateUserById(id, obj) {
  try {
    const data = {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // you have to do JSON.stringify, otherwise CORS wouldnt allow it
      body: JSON.stringify({ _id: id, ...obj }),
    };
    const theUrl = `${url}/api/user/${id}`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (e) {
    return e;
  }
}

// create a new message
async function postMessage(sender, receiver, content) {
  try {
    const theUrl = `${url}/api/message`;
    // const data = `to=${receiver}&from=${sender}&message=${content}`;
    const data = { to: receiver, from: sender, message: content };
    const res = await fetch(theUrl, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.data.message;
  } catch (err) {
    return null;
  }
}

// get image/video url from Amazon S3
async function getS3Url() {
  try {
    const theUrl = `${url}/api/s3Url`;
    // const data = `to=${receiver}&from=${sender}&message=${content}`;
    const result = await fetch(theUrl).then((res) => res.json());
    return result;
  } catch (err) {
    return null;
  }
}

// update image/video url from Amazon S3
async function sendS3(theUrl, file) {
  try {
    // const data = `to=${receiver}&from=${sender}&message=${content}`;
    const result = await fetch(theUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    return result;
  } catch (err) {
    return null;
  }
}

async function getAllPublicGroups() {
  try {
    const theUrl = `${url}/api/group/public`;
    const result = await fetch(theUrl, { method: 'GET' });
    const res = await result.json();
    return res;
  } catch (err) {
    return null;
  }
}
// get all posts
async function getAllPosts() {
  try {
    const theUrl = `${url}/api/post`;
    const result = await fetch(theUrl, { method: "GET" });
    const res = await result.json();
    return res;
  } catch (err) {
    return null;
  }
}
async function createGroup(group){
  const data = {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(group),
  };
  try {
    const theUrl = `${url}/api/group/`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (e) {
    return e;
  }
}

// join a group by id
async function joinGroup(userId, GroupId){
  const data = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: userId, _group_id: GroupId }),
  };
  try {
    console.log("check fetch join group 0");
    const theUrl = `${url}/api/join/`;
    const response = await fetch(theUrl, data);
    console.log("check fetch join group 1");
    return response;
  } catch (e) {
    return e;
  }
}

// quit a group by id
async function quitGroup(userId, GroupId){
  const data = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: userId, _group_id: GroupId }),
  };
  try {
    console.log("check fetch quit group 0");
    const theUrl = `${url}/api/quit/`;
    const response = await fetch(theUrl, data);
    console.log("check fetch quit group 1");
    return response;
  } catch (e) {
    return e;
  }
}

// create a new post
async function addPost(newPost) {
  const post = {
    title: newPost.title,
    content: newPost.content,
    author_id: newPost.id,
  };
  const data = {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  };
  try {
    const theUrl = `${url}/api/post/`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (err) {
    return null;
  }
}

// TODO: user marks a post for deletion

// TODO: admin deletes a post
async function deletePost(userID, postID, groupID) {
  try {
    const obj = {
      userId: userID,
      groupId: groupID,
    };
    const data = {
      credentials: 'include',
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    };
    const theUrl = `${url}/api/post/${postID}`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (err) {
    return err;
  }
}

// TODO: create a new comment
async function addComment(newComment, userID, postID) {
  const comment = {
    content: newComment,
    author_id: userID,
    post_id: postID,
  };
  const data = {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  };
  try {
    const theUrl = `${url}/api/comment/`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (err) {
    return null;
  }
}

// Yang: to get all comments from a PostID -> change into getCommentByID
async function getAllComment(postID) {
  const comment = {
    post_id: postID,
  };
  const data = {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  };
  try {
    const theUrl = `${url}/api/comment/`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (err) {
    return null;
  }
}

// TODO: delete a comment

// Yang: getAllPostsByGroupID
async function getAllPostsByGroupID(groupID) {
  const input = {
    group_id: groupID,
  };
  const data = {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  };
  try {
    // URL to be confirmed
    const theUrl = `${url}/api//`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (err) {
    return null;
  }
}

// Yang: getAllPostsByUserID
async function getAllPostsByUserID(userID) {
  const input = {
    user_id: userID,
  };
  const data = {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  };
  try {
    // URL to be confirmed
    const theUrl = `${url}/api//`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (err) {
    return null;
  }
}

// Yang: getCommentByID (the ID of comment itself)
// getAllComment
async function getCommentByID(commentID) {
  const input = {
    comment_id: commentID,
  };
  const data = {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  };
  try {
    // URL to be confirmed
    const theUrl = `${url}/api/comment/`;
    const response = await fetch(theUrl, data);
    return response;
  } catch (err) {
    return null;
  }
}

module.exports = {
  login,
  signup,
  logout,
  getUserbyUsername,
  getAllUsers,
  updateUserById,
  postMessage,
  getS3Url,
  sendS3,
  createGroup,
  joinGroup,
  userChangePassword,
  deactivateAccount,
  getAllPosts,
  addPost,
  getAllComment,
  addComment,
  deletePost,
  quitGroup,
  getAllPublicGroups,
  getAllPostsByGroupID,
  getAllPostsByUserID,
  getCommentByID,
};
