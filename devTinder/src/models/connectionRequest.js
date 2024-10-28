const mongoose = require("mongoose");
const { CONNECTION_STATUSES } = require("../utils/defaults");
const { ERROR } = require("../utils/messages");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users", // Reference to user collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    status: {
      type: String,
      enum: {
        values: CONNECTION_STATUSES.ALL_STATUS,
        message: ERROR.CONNECTION.INVALID_STATUS,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique compound index to prevent duplicate connection requests
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

// Pre-save middleware to prevent self-requests
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    return next(new Error(ERROR.CONNECTION.SELF_CONNECTION));
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
