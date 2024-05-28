const mongoose = require("mongoose");

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
    type: String,
    require: true,
  },
  menu_option: {
    type: [
      {
        option_id: {
          type: String,
        },
      },
    ],
    require: true,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
