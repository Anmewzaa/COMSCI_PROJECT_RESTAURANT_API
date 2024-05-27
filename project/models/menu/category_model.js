const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category_id: {
    type: String,
    require: true,
    unique: true,
  },
  category_name_th: {
    type: String,
    require: true,
  },
  category_name_en: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
