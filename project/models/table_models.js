const mongoose = require("mongoose");
const { Schema } = mongoose;
const zones = require("./zone_model");
const users = require("./user_model");
const menus = require("./menu_model");

const tableSchema = mongoose.Schema(
  {
    table_id: {
      type: String,
      require: true,
      unique: true,
    },
    table_number: {
      type: String,
      require: true,
      unique: true,
    },
    table_seat: {
      type: String,
      require: true,
    },
    table_zone: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: zones,
        },
      ],
      require: true,
    },
    table_status: {
      type: String,
      require: true,
    },
    table_employee: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: users,
        },
      ],
    },
    table_customer_amount: {
      type: String,
    },
    table_order: {
      type: [
        {
          menu: {
            type: Schema.Types.ObjectId,
            ref: menus,
          },
          status: {
            type: Number,
          },
          option: [],
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);
