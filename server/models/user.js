const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    required: true,
  },
  password: {
    type: String,
    index: true,
    required: true,
  },
  favorites: {
    type: Array,
  },
});

module.exports = mongoose.model("User", userSchema);
