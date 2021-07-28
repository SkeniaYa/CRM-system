const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    min: 1,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isUser: {
    type: Boolean,
    default: true,
  },
  googleId: {
    type: String,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
