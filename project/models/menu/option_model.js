const mongoose = require("mongoose");

const optionSchema = mongoose.Schema({
  option_id: {
    type: String,
    require: true,
    unique: true,
  },
  option_name_th: {
    type: String,
    require: true,
  },
  option_name_en: {
    type: String,
    require: true,
  },
  sub_option: [
    {
      sub_option_name_th: {
        type: String,
        require: true,
      },
      sub_option_name_en: {
        type: String,
        require: true,
      },
    },
  ],
});

module.exports = mongoose.model("Option", optionSchema);
