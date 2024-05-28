const { v4: uuidv4 } = require("uuid");
const MenuModel = require("../models/menu_model");

// UNPROTECTED
exports.get_menu = async (req, res) => {
  try {
    await MenuModel.find({}).then((data) => {
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
exports.create_menu = async (req, res) => {
  try {
    const {
      menu_name_th,
      menu_name_en,
      menu_describe_th,
      menu_describe_en,
      menu_price,
    } = req.body;
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
