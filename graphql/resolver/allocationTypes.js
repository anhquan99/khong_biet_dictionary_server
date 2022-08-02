const AllocationType = require("../../models/AllocationType");
const Authentication = require("../../Authentication/Authentication");
module.exports = {
  Query: {},
  Mutation: {
    async updateAllocationType(_, { oldAllocation, newAllocation }, context) {
      const user = Authentication(context);
      const allocationType = AllocationType.findOne({ name: oldAllocation });
      if (allocationType) {
        allocationType.Name = newAllocation;
        allocationType.CreatedAt = new Date().toISOString();
      } else {
        allocationType = new AllocationType({
          Name: newAllocation,
          Username: user.username,
          CreatedAt: new Date().toISOString()
        });
      }
      const result = await allocationType.save();
      return result;
    }
  }
};
