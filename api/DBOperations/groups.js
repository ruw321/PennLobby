// get all groups
module.exports.getGroups = async (collection) => {
  try {
    const groups = await collection.find({});
    return groups;
  } catch (err) {
    throw new Error(`Error getting all the groups: ${err.message}`);
  }
};
