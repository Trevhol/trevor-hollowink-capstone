const fs = require("fs");
const { uuid } = require("uuidv4");
let userData = require("../model/data.json");
// const path = require("path");
const allUsers = (req, res) => {
  res.json(userData);
};

// const usersId = (id) => {
const usersId = (req, res) => {
  const { id } = req.params;
  // const id = req.params.id;
  //find location by id
  const userData = JSON.parse(fs.readFileSync("./model/data.json")).users;
  const student = userData.find((student) => student.userId == id);
  //return location
  res.json({ student });
  // return student;
};

module.exports = {
  allUsers,
  usersId,
};
