const mongoose = require("mongoose");

const zoneSchema = mongoose.Schema(
  {
    zone_id: {
      type: String,
      require: true,
      unique: true,
    },
    zone_name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Zone", zoneSchema);
