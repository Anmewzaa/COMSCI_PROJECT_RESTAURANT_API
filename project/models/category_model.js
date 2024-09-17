const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category_id: {
      type: String,
      require: true,
      unique: true,
    },
    category_name: {
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
    category_image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
