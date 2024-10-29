const express = require("express");
const connectionRequest = require("../models/connectionRequest");
const users = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { faCodePullRequest } = require("@fortawesome/free-solid-svg-icons");
const userRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { USER_DEFAULTS, FEED_CONFIG } = require("../utils/constants/defaults");
const {
  PROFILE_MESSAGES,
  FEED_MESSAGES,
} = require("../utils/constants/messages");

const getPagination = (page = 1, limit = FEED_CONFIG.DEFAULT_LIMIT) => {
  limit = Math.min(limit, FEED_CONFIG.MAX_LIMIT);
  return { limit, skip: (page - 1) * limit };
};

const getUsersToBeHidden = async (loggedInUser) => {
  const hiddenUsers = await ConnectionRequest.find({
    $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
  }).select("fromUserId toUserId");

  return new Set(
    hiddenUsers.flatMap((user) => [
      user.fromUserId.toString(),
      user.toUserId.toString(),
    ])
  );
};

// Get pending connection requests
userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const pendingRequests = await ConnectionRequest.find({
      toUserId: req.user._id,
      status: "interested",
    }).populate("fromUserId", USER_DEFAULTS.SAFE_DATA_FIELDS);

    if (!pendingRequests.length) {
      return res
        .status(204)
        .json({ message: PROFILE_MESSAGES.NO_PENDING_REQUESTS, data: [] });
    }
    return res.json({ data: pendingRequests });
  } catch (err) {
    res
      .status(500)
      .json({ message: FEED_MESSAGES.ERROR_FETCHING_DATA, error: err.message });
  }
});

// Get all connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const acceptedRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: req.user._id, status: "accepted" },
        { toUserId: req.user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_DEFAULTS.SAFE_DATA_FIELDS)
      .populate("toUserId", USER_DEFAULTS.SAFE_DATA_FIELDS);

    if (!acceptedRequests.length) {
      return res
        .status(204)
        .json({ message: PROFILE_MESSAGES.NO_ACTIVE_CONNECTIONS });
    }
    const connections = acceptedRequests.map((row) =>
      row.fromUserId._id.equals(req.user._id) ? row.toUserId : row.fromUserId
    );

    res.json({
      data: connections,
      message: PROFILE_MESSAGES.CONNECTIONS_FETCH_SUCCESS,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: FEED_MESSAGES.ERROR_FETCHING_DATA, error: err.message });
  }
});

// Get user feed with pagination
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { page = 1, limit = FEED_CONFIG.DEFAULT_LIMIT } = req.query;
    const { limit: limited, skip } = getPagination(page, limit);

    const hiddenUsersSet = await getUsersToBeHidden(loggedInUser);

    const feedUsers = await User.find({
      _id: { $nin: Array.from(hiddenUsersSet).concat(loggedInUser._id) },
    })
      .select(USER_DEFAULTS.SAFE_DATA_FIELDS)
      .skip(skip)
      .limit(limited);

    res.json({ data: feedUsers, message: FEED_MESSAGES.FETCH_SUCCESS });
  } catch (err) {
    res
      .status(500)
      .json({ message: FEED_MESSAGES.ERROR_FETCHING_DATA, error: err.message });
  }
});

module.exports = userRouter;
