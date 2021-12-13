const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : '';

// log in a user
async function login(u, p) {
  const user = {
    username: u,
    password: p,
  };
  const data = {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

// get all users
async function getAllUsers() {
  try {
    const theUrl = `${url}/api/user`;
    const result = await fetch(theUrl, { method: 'GET' });
    const res = await result.json();
    return res;
  } catch (err) {
    return null;
  }
}

// create a new message
async function postMessage(sender, receiver, content) {
  try {
    const theUrl = `${url}/api/message`;
    // const data = `to=${receiver}&from=${sender}&message=${content}`;
    const data = { to: receiver, from: sender, message: content };
    const res = await fetch(theUrl, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
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

// update image/video url to Amazon S3
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

// get all posts
async function getAllPosts() {
  try {
    const theUrl = `${url}/api/post`;
    const result = await fetch(theUrl, { method: 'GET' });
    const res = await result.json();
    return res;
  } catch (err) {
    return null;
  }
}

module.exports = {
  login, signup, logout, getAllUsers, postMessage, getS3Url, sendS3, getAllPosts,
};
