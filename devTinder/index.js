const express = require("express");

const app = express();

app.get("/test", (_, res) => {
  res.send("GET from test");
});
app.post("/test", (_, res) => {
  res.send("POST from admin");
});
app.delete("/test", (_, res) => {
  res.send("DELETE from home");
});

app.get("*post*", (req, res) => {
  res.send(
    `IT is regex for dscarrerds”, “carrer”, “carrerdsf”, and “dsfsdcarrer`
  );
});

app.get("/post/:postId", (req, res) => {
  res.send(`Post ID is ${JSON.stringify(req.params)}`);
});
app.get("/post", (req, res) => {
  res.send(`Optional Paramters ${JSON.stringify(req.query)}`);
});

app.listen(7777, () => {
  console.log("app running on port - 7777");
});
