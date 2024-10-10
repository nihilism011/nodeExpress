const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  const { id } = req.query;
  res.json({ name: "getTest" + id });
});
app.get("/user/:id", (req, res) => {
  const result = "검색된 아이디 : " + req.params.id;
  res.json({ result: result });
});
app.post("/test", (req, res) => {
  res.json({ name: "postTest" });
});
app.delete("/test", (req, res) => {
  res.json({ name: "deleteTest" });
});
app.patch("/test", (req, res) => {
  res.json({ name: "patchTest" });
});
app.put("/test", (req, res) => {
  res.json({ name: "putTest" });
});
app.get("/", function (req, res) {
  res.send("Hello World~");
});
app.listen(3000);
