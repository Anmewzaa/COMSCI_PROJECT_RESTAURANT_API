const mongoose = require("mongoose");

const table_history_Schema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  table: {
    type: [],
    required: true,
  },
});

module.exports = mongoose.model("TableHistoryData", table_history_Schema);
