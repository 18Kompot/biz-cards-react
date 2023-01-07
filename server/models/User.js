const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 256,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 256,
  },
  isBiz: {
    type: Boolean,
    default: false,
    required: true,
  },
  // isAdmin: {
  //     type: Boolean,
  //     default: false,
  //     required: true,
  // }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
