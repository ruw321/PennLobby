const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : '';
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

async function logout() {
  try {
    const theUrl = `${url}/api/user/`;
    return await fetch(theUrl);
  } catch (e) {
    return e;
  }
}

async function getUserbyUsername(username) {
  try {
    const theUrl = `${url}/api/user/username/${username}`;
    const response = await fetch(theUrl);
    return response;
  } catch (e) {
    return e;
  }
}

async function userChangePassword(id, newPass) {
  const obj = { password: newPass };
  const data = {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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

async function deactivateAccount(id) {
  const data = {
    credentials: 'include',
    method: 'DELETE',
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

=======
// all user APIs
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
module.exports = {
  login, signup, logout, getUserbyUsername, getAllUsers, postMessage, getS3Url, sendS3, userChangePassword, deactivateAccount,
};
