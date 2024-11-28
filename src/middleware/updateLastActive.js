// not in use anywhere for now
const updateLastActiveTime = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { lastActiveTime: new Date() });
    next();
  } catch (error) {
    console.error("Error updating last active time:", error);
    next();
  }
};

module.exports = updateLastActiveTime;
