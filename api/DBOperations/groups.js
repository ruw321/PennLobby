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
    const group = await collection.findOne({ id: ID });
    return group;
  } catch (err) {
    throw new Error(`Error getting the group by id: ${err.message}`);
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
