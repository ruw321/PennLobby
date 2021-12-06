module.exports.getUsers = async (collection) => {
  try {
    const users = await collection.find({});
    return users;
  } catch (err) {
    throw new Error(`Error getting all the users: ${err.message}`);
  }
};

// TODO: add the function: req.isAuthenticated() 
// to make sure that only logged in users can access

module.exports.getUserbyEmail = async (collection, theEmail) => {
  try {
    const user = await collection.findOne({ email: theEmail });
    return user;
  } catch (err) {
    throw new Error(`Error getting the user by email: ${err.message}`);
  }
};

// this checks if the user already exists in the database
module.exports.getUserbyUsername = async (collection, Username) => {
  try {
    const user = await collection.findOne({ username: Username });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(`Error getting the user by email: ${err.message}`);
  }
};

module.exports.getUserbyId = async (collection, ID) => {
  try {
    const user = await collection.findOne({ id: ID });
    return user;
  } catch (err) {
    throw new Error(`Error getting the user by email: ${err.message}`);
  }
};

module.exports.addUser = async (collection, userObject) => {
  try {
    const result = await collection.create(userObject);
    return result;
  } catch (err) {
    throw new Error(`Error adding the user: ${err.message}`);
  }
};