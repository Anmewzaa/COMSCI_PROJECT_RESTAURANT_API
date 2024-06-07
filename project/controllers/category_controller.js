const { v4: uuidv4 } = require("uuid");
const CategoryModel = require("../models/category_model");

// UNPROTECTED
exports.get_category = async (req, res) => {
  try {
    await CategoryModel.find({}).then((data) => {
      res.status(200).json({
        response: [data],
        error: "",
      });
    });
  } catch (eerr) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.getone_category = async (req, res) => {
  try {
    const { category_id } = req.params;
    await CategoryModel.findOne({ category_id }).then((data) => {
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
exports.create_category = async (req, res) => {
  try {
    const { category_name_th, category_name_en } = req.body;
    if (!(category_name_th && category_name_en)) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    await CategoryModel.create({
      category_id: uuidv4(),
      category_name_th: category_name_th,
      category_name_en: category_name_en,
    }).then(() => {
      res.status(200).json({
        response: [{ message: "create category success" }],
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
