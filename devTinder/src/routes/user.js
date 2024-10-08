const express = require("express");
const connectionRequest = require("../models/connectionRequest");
const users = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { faCodePullRequest } = require("@fortawesome/free-solid-svg-icons");
const userRouter = express.Router();
const USER_SAFE_DATA = "fName lName age gender about skills profileURL";
// pending connection requests
userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const interestedRequest = await connectionRequest
      .find({
        toUserId: req.user._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);
    // .populate("fromUserId", ["fName", "lName"]);

    if (!interestedRequest.length > 0) {
      return res
        .status(203)
        .json({ message: "No active connection request found", data: [] });
    }
    res.json({ data: interestedRequest });
  } catch (err) {
    res.status(401).send("Error : " + err);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const acceptedRequests = await connectionRequest
      // .find({ toUserId: req.user._id, status: "accepted" })
      .find({
        $or: [
          { fromUserId: req.user._id, status: "accepted" },
          { toUserId: req.user._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    if (!acceptedRequests.length > 0) {
      return res
        .status(404)
        .json({ message: "No active connection request found" });
    }

    const data = acceptedRequests.map((row) => {
      if (row?.fromUserId._id.equals(req.user._id)) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data, message: "connections fetched successfully!" });

    // res.json(acceptedRequests.toUserId);
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  let limit = req.query.limit || 10;
  limit = limit > 50 ? 50 : limit; // at max limit should be 50
  const page = req.query.page || 1;
  const skip = (page - 1) * 10;
  try {
    const usersToBeHidden = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser }, { toUserId: loggedInUser }],
      })
      .select("fromUserId toUserId");

    let usersToBeHiddenSet = new Set();

    usersToBeHidden.map((user) => {
      usersToBeHiddenSet.add(user.fromUserId.toString());
      usersToBeHiddenSet.add(user.toUserId.toString());
    });

    const usersToShow = await users
      .find({
        $and: [
          { _id: { $ne: loggedInUser._id } },
          {
            _id: { $nin: Array.from(usersToBeHiddenSet) },
          },
        ],
      })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    console.log(usersToShow);

    res.json({ data: usersToShow, message: "feed data " });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

module.exports = userRouter;
