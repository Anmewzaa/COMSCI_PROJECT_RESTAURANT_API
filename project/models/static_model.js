const mongoose = require("mongoose");

const staticSchema = mongoose.Schema(
  {
    static_id: {
      type: String,
      require: true,
    },
    static_date: {
      type: Date,
    },
    static_info: {
      type: [
        {
          visits: {
            type: Number,
          },
          income: {
            type: Number,
          },
          profit: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Static", staticSchema);
