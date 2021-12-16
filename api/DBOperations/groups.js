// get all groups
module.exports.getGroups = async (collection) => {
  try {
    const groups = await collection.find({});
    return groups;
  } catch (err) {
    throw new Error(`Error getting all the groups: ${err.message}`);
  }
};

// get group by id
module.exports.getGroupById = async (collection, ID) => {
  try {
    const group = await collection.findOne({ _id: ID });
    return group;
  } catch (err) {
    throw new Error(`Error getting the group by id: ${err.message}`);
  }
};

// get group by name
module.exports.getGroupByName = async (collection, groupName) => {
  try {
    const group = await collection.findOne({ name: groupName });
    return group;
  } catch (err) {
    throw new Error(`Error getting the group by name: ${err.message}`);
  }
};

// add a new group
module.exports.addGroup = async (collection, groupObject) => {
  try {
    const result = await collection.create(groupObject);
    return result;
  } catch (err) {
    throw new Error(`Error adding the group: ${err.message}`);
  }
};

// delete group by id
module.exports.deleteGroupById = async (collection, ID) => {
  try {
    const group = await collection.deleteOne({ id: ID });
    return group;
  } catch (err) {
    throw new Error(`Error deleting the group by id: ${err.message}`);
  }
};

// delete group by owner
module.exports.deleteGroupByOwner = async (collection, onweID) => {
  try {
    const group = await collection.deleteMany({ owner: onweID });
    return group;
  } catch (err) {
    throw new Error(`Error deleting the group by owner: ${err.message}`);
  }
};

// update group by id
module.exports.updateGroupById = async (collection, ID, updatedObject) => {
  try {
    const response = await collection.updateOne(
      { _id: ID },
      { $set: updatedObject }
    );
    return response;
  } catch (err) {
    throw new Error(`Error updating the group by id: ${err.message}`);
  }
};
