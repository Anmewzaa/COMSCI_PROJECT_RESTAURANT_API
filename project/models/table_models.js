const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
  table_id: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("Table", tableSchema);
