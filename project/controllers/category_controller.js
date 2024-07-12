const { v4: uuidv4 } = require("uuid");
const CategoryModel = require("../models/category_model");

// UNPROTECTED
exports.get_category = async (req, res) => {
  try {
    await CategoryModel.find({}).then((data) => {
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
exports.getone_category = async (req, res) => {
  try {
    const { category_id } = req.params;
    await CategoryModel.findOne({ category_id }).then((data) => {
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
exports.create_category = async (req, res) => {
  try {
    const { category_name_thai, category_name_english } = req.body;
    if (!(category_name_thai && category_name_english)) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    await CategoryModel.create({
      category_id: uuidv4(),
      category_name: {
        thai: category_name_thai,
        english: category_name_english,
      },
    }).then(() => {
      res.status(201).json({
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
exports.update_category = async (req, res) => {
  try {
    const { category_id } = req.params;
    const { category_name_thai, category_name_english } = req.body;
    if (!(category_name_thai && category_name_english)) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    const check = await CategoryModel.findOne({
      category_id: category_id,
    });
    if (!check) {
      return res.status(400).json({
        response: [],
        error: "invalid category id",
      });
    }
    await CategoryModel.findOneAndUpdate(
      { category_id: category_id },
      {
        category_name: {
          thai: category_name_thai,
          english: category_name_english,
        },
      }
    ).then(() => {
      res.status(200).json({
        response: [{ message: "update category success" }],
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
exports.delete_category = async (req, res) => {
  try {
    const { category_id } = req.params;
    await CategoryModel.findOneAndDelete({ category_id: category_id }).then(
      () => {
        res.json({
          response: [{ message: "delete category success" }],
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
