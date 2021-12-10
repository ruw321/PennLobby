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
    const theUrl = `${url}/api/messages`;
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
module.exports = {
  login, signup, logout, getAllUsers, postMessage,
};
