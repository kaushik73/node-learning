const fs = require("fs");
const https = require("https");

console.log("Kitne aadmi the ??");

const num1 = 2;
const num2 = 3;

https.get("https://dummyjson.com/todos/1", function callback(response) {
  // I am callback function which will run after the dummyJSON has been read from API server
  console.log("hey I am here");
});

setTimeout(function callback() {
  console.log("I will after 5 seconds Sarkaar!");
}, 5000);

fs.readFile("./file.txt", "utf-8", function callback(err, response) {
  console.log("This will get printed after file read ", response);
});

function kitneAadmiThe(a, b) {
  return a * b;
}

console.log("Sarkar kul aadmi the ...?", kitneAadmiThe(num1, num2));
