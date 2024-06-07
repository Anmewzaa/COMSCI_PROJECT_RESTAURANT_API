const mongoose = require("mongoose");
const { Schema } = mongoose;
const categories = require("./category_model");
const options = require("./option_model");

const menuSchema = mongoose.Schema({
  menu_id: {
    type: String,
    require: true,
    unique: true,
  },
  menu_name_th: {
    type: String,
    require: true,
  },
  menu_name_en: {
    type: String,
    require: true,
  },
  menu_describe_th: {
    type: String,
    require: true,
  },
  menu_describe_en: {
    type: String,
    require: true,
  },
  menu_price: {
    type: String,
    require: true,
  },
  menu_image: {
    type: String,
    require: true,
  },
  category_id: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: categories,
      },
    ],
    require: true,
  },
  menu_option: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: options,
      },
    ],
  },
});

module.exports = mongoose.model("Menu", menuSchema);
