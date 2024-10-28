const express = require("express");
const requestRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const { REQUEST_MESSAGES, CUSTOM_MESSAGES } = require("../utils/messages");
const { CONNECTION_STATUSES } = require("../utils/defaults");

const doesUserExist = async (userId) => {
  return await User.findById(userId);
};

const isRequestAlreadyExist = async (fromUserId, toUserId) => {
  return await ConnectionRequest.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });
};

// Send connection request (interested, ignored)
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      // Validate status
      if (!CONNECTION_STATUSES.SENT.includes(status)) {
        return res
          .status(400)
          .json({ message: REQUEST_MESSAGES.INVALID_STATUS });
      }

      // Check if the target user exists
      if (!(await doesUserExist(toUserId))) {
        return res
          .status(404)
          .json({ message: REQUEST_MESSAGES.USER_NOT_EXIST });
      }

      // Prevent sending request to self
      if (fromUserId === toUserId) {
        return res.status(400).json({ message: REQUEST_MESSAGES.REQUEST_SELF });
      }

      // Check if a request already exists
      if (await isRequestAlreadyExist(fromUserId, toUserId)) {
        return res
          .status(400)
          .json({ message: REQUEST_MESSAGES.REQUEST_ALREADY_EXISTS });
      }

      // Save new connection request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      const message =
        status === "interested"
          ? CUSTOM_MESSAGES.INTERESTED_MESSAGE(fromUserId, toUserId)
          : CUSTOM_MESSAGES.IGNORED_MESSAGE(fromUserId, toUserId);

      res.json({ message, data });
    } catch (err) {
      res.status(500).json({ message: CUSTOM_MESSAGES.ERROR(err) });
    }
  }
);

// Review connection request (accepted, rejected)
// requestId is fromUserId
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user._id;

      // Validate status
      if (!CONNECTION_STATUSES.REVIEW.includes(status)) {
        return res
          .status(400)
          .json({ message: REQUEST_MESSAGES.INVALID_STATUS });
      }

      // Find the connection request for review
      const connectionRequest = await ConnectionRequest.findOne({
        toUserId: loggedInUser,
        fromUserId: requestId,
        status: "interested",
      });

      // If request does not exist
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: REQUEST_MESSAGES.REQUEST_NOT_FOUND });
      }

      // Update request status
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: REQUEST_MESSAGES.CONNECTION_REQUEST_UPDATED, data });
    } catch (err) {
      res.status(500).json({ message: CUSTOM_MESSAGES.ERROR(err) });
    }
  }
);

module.exports = requestRouter;
