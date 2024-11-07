const TableHistoryModel = require("../models/table_history_model");
const moment = require("moment");

exports.get_table_history = async (req, res) => {
  try {
    await TableHistoryModel.find({}).then((data) => {
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
exports.create_table_history = async (req, res) => {
  try {
    const { table } = req.body;

    const currentDate = moment();
    await TableHistoryModel.create({ date: currentDate, table: table }).then(
      (data) => {
        res.status(200).json({
          response: data,
          error: "",
        });
      }
    );
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.delete_table_history = async (req, res) => {
  try {
    const { id } = req.params;

    await TableHistoryModel.findOneAndDelete({ _id: id }).then(() => {
      res.status(200).json({
        response: "Remove Table History Success",
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
