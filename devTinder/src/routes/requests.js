const express = require("express");
const requestRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

// for interseted , ignored
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        res.status(401).json({ message: "invalid status type", status });
      }

      const istoUserExist = await User.findById(toUserId);
      if (!istoUserExist) {
        return res.json({ message: "user not exist " });
      }

      const isFromAndToAreSame = fromUserId === toUserId;
      if (isFromAndToAreSame) {
        return res.json({ message: "You cannont sent request to yourself " });
      }
      const isRequestAlreadyExist = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isRequestAlreadyExist) {
        throw new Error("Request Already Exist, In review State");
      }
      const data = await connectionRequest.save();

      status === "interested"
        ? res.json({
            message: `${fromUserId} is interested in  ${toUserId}`,
            data,
          })
        : res.json({
            message: `${fromUserId} has ignored ${toUserId}`,
            data,
          });
    } catch (err) {
      res.status(401).send("Error : " + err);
    }
  }
);

// for accepted , rejected
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        res.status(401).json({ message: "invalid status type", status });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        fromUserId: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        res.status(404).json({ message: "connection request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: "connection request " + status, data });
    } catch (err) {
      res.status(401).send("Error : " + err);
    }
  }
);

module.exports = requestRouter;
