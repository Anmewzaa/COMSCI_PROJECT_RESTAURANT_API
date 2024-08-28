const { v4: uuidv4 } = require("uuid");
const ZoneModel = require("../models/zone_model");

// PROTECTED
exports.get_zone = async (req, res) => {
  try {
    await ZoneModel.find({}).then((data) => {
      res.json({
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
exports.getone_zone = async (req, res) => {
  try {
    const { zone_id } = req.params;
    await ZoneModel.findOne({ zone_id: zone_id }).then((data) => {
      res.json({
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
exports.create_zone = async (req, res) => {
  try {
    const { zone_name } = req.body;
    if (!zone_name) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    await ZoneModel.create({ zone_id: uuidv4(), zone_name: zone_name }).then(
      () => {
        res.json({
          response: [{ message: "create zone success" }],
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
exports.update_zone = async (req, res) => {
  try {
    const { zone_id } = req.params;
    const { zone_name } = req.body;
    if (!zone_name) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    await ZoneModel.findOneAndUpdate(
      { zone_id: zone_id },
      { zone_name: zone_name }
    ).then(() => {
      res.json({
        response: [{ message: "update zone success" }],
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
exports.delete_zone = async (req, res) => {
  try {
    const { zone_id } = req.params;
    await ZoneModel.findOneAndDelete({ zone_id: zone_id }).then(() => {
      res.json({
        response: [{ message: "delete zone success" }],
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
