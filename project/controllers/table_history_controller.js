const TableHistroyModel = require("../models/table_history_model");

exports.get_history = async (req, res) => {
  try {
    await TableHistroyModel.find({}).then((data) => {
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
