const mongoose = require("mongoose");

const table_history_Schema = mongoose.Schema({
  table_number: {
    type: String,
    required: true,
    unique: true,
  },
  table_order_history: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000,
  },
});

module.exports = mongoose.model("TableHistoryData", table_history_Schema);
