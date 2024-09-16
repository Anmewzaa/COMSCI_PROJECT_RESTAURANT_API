const mongoose = require("mongoose");
const { Schema } = mongoose;
const menus = require("../models/menu_model");

const dailySchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  visits: {
    type: Number,
    default: 0,
  },
  orders: {
    type: Number,
    default: 0,
  },
  tables: {
    type: Number,
    default: 0,
  },
  income: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  },
  menus: {
    type: [
      {
        menu: {
          type: Schema.Types.ObjectId,
          ref: menus,
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
});

module.exports = mongoose.model("DailyData", dailySchema);
