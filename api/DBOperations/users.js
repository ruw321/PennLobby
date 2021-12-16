// get all users
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

// get user by username
module.exports.getUserByUsername = async (collection, Username) => {
  try {
    const user = await collection.findOne({ username: Username });
    return user;
  } catch (err) {
    throw new Error(`Error getting the user by email: ${err.message}`);
  }
};

// get user by id
module.exports.getUserById = async (collection, ID) => {
  try {
    const user = await collection.findOne({ _id: ID });
    return user;
  } catch (err) {
    throw new Error(`Error getting the user by ID: ${err.message}`);
  }
};

// add a new user
module.exports.addUser = async (collection, userObject) => {
  try {
    const result = await collection.create(userObject);
    return result;
  } catch (err) {
    throw new Error(`Error adding the user: ${err.message}`);
  }
};

// delete user by id
module.exports.deleteUserById = async (collection, ID) => {
  try {
    const user = await collection.deleteOne({ id: ID });
    return user;
  } catch (err) {
    throw new Error(`Error deleting the user by id: ${err.message}`);
  }
};

// update user by id
module.exports.updateUserById = async (collection, ID, updatedObject) => {
  try {
    const response = await collection.updateOne(
      { _id: ID },
      { $set: updatedObject }
    );
    return response;
  } catch (err) {
    throw new Error(`Error updating the user by id: ${err.message}`);
  }
};

// user change password
module.exports.changePassword = async (collection, ID, newPass) => {
  try {
    // here i have to do "findone and save" to replace "updateOne"
    // in order to trigger the function in model User where it
    // automatically hashes the password
    const response = await collection.findOne(
      { _id: ID },
    );
    response.password = newPass;
    response.save();
    return response;
  } catch (err) {
    throw new Error(`Error updating the user by id: ${err.message}`);
  }
};