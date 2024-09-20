const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/page") {
    res.end("Page Screen");
  }
  res.end("hello");
});

server.listen(7777, () => {
  console.log("server running on port 7777");
});
