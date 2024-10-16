const { v4: uuidv4 } = require("uuid");
const OptionModel = require("../models/option_model");

// UNPROTECTED
exports.get_option = async (req, res) => {
  try {
    await OptionModel.find({}).then((data) => {
      res.status(200).json({
        response: data,
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
exports.getone_option = async (req, res) => {
  try {
    const { option_id } = req.params;
    await OptionModel.findOne({ option_id: option_id }).then((data) => {
      res.status(200).json({
        response: data,
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
    const { option_name_thai, option_name_english, sub_option } = req.body;
    if (!(option_name_thai && option_name_english && sub_option.length !== 0)) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    await OptionModel.create({
      option_id: uuidv4(),
      option_name: {
        thai: option_name_thai,
        english: option_name_english,
      },
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
exports.update_option = async (req, res) => {
  try {
    const { option_id } = req.params;
    const { option_name_thai, option_name_english, sub_option } = req.body;
    if (!(option_id && option_name_thai && option_name_english && sub_option)) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    await OptionModel.findOneAndUpdate(
      { option_id: option_id },
      {
        option_name: {
          thai: option_name_thai,
          english: option_name_english,
        },
        sub_option: sub_option,
      }
    ).then(() => {
      res.json({
        response: [{ message: "update option success" }],
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
exports.delete_option = async (req, res) => {
  try {
    const { option_id } = req.params;
    if (!option_id) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    await OptionModel.findOneAndDelete({ option_id: option_id }).then(() => {
      res.json({
        response: [{ message: "delete option success" }],
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
