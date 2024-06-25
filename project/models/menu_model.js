const mongoose = require("mongoose");
const { Schema } = mongoose;
const categories = require("./category_model");
const options = require("./option_model");

const menuSchema = mongoose.Schema(
  {
    menu_id: {
      type: String,
      require: true,
      unique: true,
    },
    menu_name: {
      type: {
        thai: {
          type: String,
        },
        english: {
          type: String,
        },
      },
      require: true,
    },
    menu_describe: {
      type: {
        thai: {
          type: String,
        },
        english: {
          type: String,
        },
      },
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
    menu_category_id: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: categories,
        },
      ],
      require: true,
    },
    menu_option_id: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: options,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
