const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const Conversation = require("../models/conversation");
const { userAuth } = require("../middleware/auth");

router.post("/send/:id", userAuth, async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // we need to create one :
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage._id);

    // Todo : Socket code
    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({ message: newMessage });
  } catch (err) {
    console.log("Error in post messages/send", err);

    res.status(500).json({ error: "Failed to send message" });
  }
});

router.get("/:id", userAuth, async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // do not give us messages ref instead give messages

    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
  } catch (err) {
    console.log("Error in get messages", err);

    res.status(500).json({ error: "Failed to get messages" });
  }
});
module.exports = router;
