const AllocationType = require("../../models/AllocationType");
const Authentication = require("../../Authentication/Authentication");
module.exports = {
  Query: {},
  Mutation: {
    async updateAllocationType(_, { id, allocation }, context) {
      const user = Authentication(context);
      var allocationType = await AllocationType.findOne({ _id: id });
      if (allocationType) {
        allocationType.Name = allocation;
        allocationType.CreatedAt = new Date().toISOString();
      } else {
        allocationType = new AllocationType({
          Name: allocation,
          Username: user.username,
          CreatedAt: new Date().toISOString()
        });
      }
      const result = await allocationType.save();
      return result;
    }
  }
};
