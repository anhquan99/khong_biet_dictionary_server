const { Schema } = require("mongoose");

const VoteSchema = new Schema({
    Voter : {
      type: Schema.Types.ObjectId,
      ref : "User"
    },
    CreatedAt: {
      type: Date,
      require : true
    },
    IsUpVote: {
      type: Boolean
    }
});

export default VoteSchema;