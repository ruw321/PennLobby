const url = 'http://localhost:8080';
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

module.exports = {
  login, signup, logout, getUserbyUsername, userChangePassword, deactivateAccount,
};
