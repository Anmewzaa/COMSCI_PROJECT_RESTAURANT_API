const { v4: uuidv4 } = require("uuid");
const OptionModel = require("../../models/menu/option_model");

exports.create = async (req, res) => {
  try {
    const {} = req.body;
  } catch (err) {
    res.json({
      response: [],
      error: err,
    });
  }
};
