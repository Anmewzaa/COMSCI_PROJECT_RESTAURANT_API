const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    unique: true,
  },
  user_name: {
    type: String,
    require: true,
  },
  user_nickname: {
    type: String,
    require: true,
  },
  user_telnum: {
    type: String,
    require: true,
  },
  user_role: {
    type: String,
    require: true,
  },
  user_access_rights: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
