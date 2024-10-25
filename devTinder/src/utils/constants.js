export const AllowedCorosMethods = [
  "GET",
  "POST",
  "PATCH",
  "DELETE",
  "OPTIONS",
];

export const AllowedFrontEndURI = "http://localhost:5173";

export const MongoDbURI =
  "mongodb+srv://NamasteNode:HcM1uzZSFggAQMtY@namastenode.l8mtm.mongodb.net/devTinder";

export const JWTSecretKey = "DEV@Tinder$790";
export const JWTExpireInDays = "7d";

export const GmailSecretCred = {
  user: "kaushikjain67890@gmail.com",
  pass: "vkfx pibl pjey upoa", // Store in env variables in production
};

export const emailServiceType = "gmail";

export const allowedReviewStatus = ["accepted", "rejected"];
export const allowedSentStatus = ["ignored", "interested"];

export const maxFeedLimit = 50;
export const defaultFeedLimit = 10;

export const userSafeData = "fName lName age gender about skills profileURL";
export const AllowedProfileUpdates = [
  "profileURL",
  "about",
  "gender",
  "age",
  "fName",
  "lName",
];

export const MAX_SERVER_START_TRY = 5;
export const SERVER_RESTART_TIME = 3000;

export const Default_User_Image_URI =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mYGiDHOtUVcSxuzNfeds4xWXNOpQ-lIMPA&s";

export const Default_User_About = "This is default about";
