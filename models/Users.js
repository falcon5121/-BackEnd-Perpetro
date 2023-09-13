const mongoose = require("mongoose");

const Users = mongoose.model("users", {
  Username: String,
  Password: String,
});

module.exports = Users;
