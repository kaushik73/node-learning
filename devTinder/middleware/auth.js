const adminAuth = (req, res, next) => {
  console.log("admin auth middleware called");

  let token = "xyz";
  isAuthorized = token === "xyz";

  if (!isAuthorized) {
    res.send("Unathorized");
  }
  next();
};
const userAuth = (req, res, next) => {
  console.log("user auth middleware called");
  let token = "abc";
  isAuthorized = token === "abc";

  if (!isAuthorized) {
    res.send("Unathorized");
  }
  next();
};

module.exports = {
  adminAuth,
  userAuth,
};
