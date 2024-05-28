const { v4: uuidv4 } = require("uuid");
const OptionModel = require("../models/option_model");

// UNPROTECTED
exports.get_option = async (req, res) => {
  try {
    await OptionModel.find({}).then((data) => {
      res.status(200).json({
        response: [data],
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};

// PROTECTED
exports.create_option = async (req, res) => {
  try {
    const { option_name_th, option_name_en, sub_option } = req.body;
    if (!(option_name_th && option_name_en && sub_option.length !== 0)) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    await OptionModel.create({
      option_id: uuidv4(),
      option_name_th: option_name_th,
      option_name_en: option_name_en,
      sub_option: sub_option,
    }).then(() => {
      res.status(200).json({
        response: [{ message: "create option success" }],
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
