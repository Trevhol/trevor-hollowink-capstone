const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { uuid } = require("uuidv4");

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from express");
});

// app.get("/student");

// app.get("/classroom");

app.post("/upload", (req, res) => {
  console.log(req.body);
  //   fs.writeFileSync("/public/uploads", req.files.file.ws.path, function (err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("file uploaded");
  //     }
  //   });
  res.json({ message: req.body });
});

app.listen(5000);
