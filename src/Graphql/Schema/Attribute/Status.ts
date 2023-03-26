const StatusSchema = {
    type: String,
    require: true,
    enum: {
      values: ["submitted", "approved", "rejected", "deleted", "reported"],
      message: "{VALUE} is not supported"
    }
};

export default StatusSchema;