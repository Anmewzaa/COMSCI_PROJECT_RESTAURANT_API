const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    unique: true,
  },
  account_username: {
    type: String,
    require: true,
  },
  account_password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Acount", accountSchema);
