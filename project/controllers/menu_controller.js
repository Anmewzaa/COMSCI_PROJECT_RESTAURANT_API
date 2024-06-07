const { v4: uuidv4 } = require("uuid");
const MenuModel = require("../models/menu_model");

// UNPROTECTED
exports.get_menu = async (req, res) => {
  try {
    await MenuModel.find({})
      .populate("category_id")
      .populate("menu_option")
      .then((data) => {
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
exports.getone_menu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    await MenuModel.findOne({ menu_id })
      .populate("category_id")
      .populate("menu_option")
      .then((data) => {
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
      category_id,
      menu_option,
    } = req.body;
    if (
      !(
        menu_name_th &&
        menu_name_en &&
        menu_describe_th &&
        menu_describe_en &&
        menu_price &&
        category_id &&
        menu_option &&
        req.file
      )
    ) {
      return res.json({
        response: [],
        error: "input required",
      });
    }
    menu_image = req.file.filename;
    await MenuModel.create({
      menu_id: uuidv4(),
      menu_name_th: menu_name_th,
      menu_name_en: menu_name_en,
      menu_describe_th: menu_describe_th,
      menu_describe_en: menu_describe_en,
      menu_price: menu_price,
      menu_image: menu_image,
      category_id: category_id,
      menu_option: menu_option,
    }).then(() => {
      res.status(201).json({
        response: [{ message: "create menu success" }],
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
