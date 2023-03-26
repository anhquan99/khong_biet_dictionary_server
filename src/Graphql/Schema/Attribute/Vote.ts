const { Schema } = require("mongoose");

const VoteSchema = new Schema({
    Voter : {
      type: Schema.Types.ObjectId,
      unique: true,
      ref : "User"
    },
    CreatedAt: {
      type: String,
      require : true
    },
    IsUpVote: {
      type: Boolean
    }
});

export default VoteSchema;