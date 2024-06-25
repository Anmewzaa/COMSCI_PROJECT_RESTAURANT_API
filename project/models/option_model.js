const mongoose = require("mongoose");

const optionSchema = mongoose.Schema(
  {
    option_id: {
      type: String,
      require: true,
      unique: true,
    },
    option_name: {
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
    sub_option: {
      type: [
        {
          sub_option_name: {
            type: {
              thai: {
                type: String,
              },
              english: {
                type: String,
              },
            },
          },
        },
      ],
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Option", optionSchema);
