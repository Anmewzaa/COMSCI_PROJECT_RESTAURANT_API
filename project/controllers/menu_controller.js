const { v4: uuidv4 } = require("uuid");
const MenuModel = require("../models/menu_model");
const fs = require("fs");

// UNPROTECTED
exports.get_menu = async (req, res) => {
  try {
    await MenuModel.find({})
      .populate("menu_category_id")
      .populate("menu_option_id")
      .then((data) => {
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
exports.getone_menu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    if (!menu_id) {
      return res.status(400).json({
        response: "",
        error: "input required",
      });
    }
    await MenuModel.findOne({ menu_id })
      .populate("menu_category_id")
      .populate("menu_option_id")
      .then((data) => {
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
exports.get_menu_from_category = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({
        response: "",
        error: "input required",
      });
    }
    await MenuModel.find({ menu_category_id: _id })
      .populate("menu_category_id")
      .populate("menu_option_id")
      .then((data) => {
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
exports.create_menu = async (req, res) => {
  try {
    const {
      menu_name_thai,
      menu_name_english,
      menu_describe_thai,
      menu_describe_english,
      menu_price,
      menu_cost,
      menu_category_id,
      menu_option_id,
    } = req.body;

    if (
      !(
        menu_name_thai &&
        menu_name_english &&
        menu_describe_thai &&
        menu_describe_english &&
        menu_cost &&
        menu_price &&
        menu_category_id &&
        menu_option_id &&
        req.file
      )
    ) {
      return res.json({
        response: [],
        error: "input required",
      });
    }
    const optionIds = menu_option_id
      ? Array.isArray(menu_option_id)
        ? menu_option_id
        : [menu_option_id]
      : [];
    menu_image = req.file.filename;
    await MenuModel.create({
      menu_id: uuidv4(),
      menu_name: {
        thai: menu_name_thai,
        english: menu_name_english,
      },
      menu_describe: {
        thai: menu_describe_thai,
        english: menu_describe_english,
      },
      menu_price: menu_price,
      menu_cost: menu_cost,
      menu_image: menu_image,
      menu_category_id: menu_category_id,
      menu_option_id: optionIds,
      menu_status: true,
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
exports.update_menu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const {
      menu_name_thai,
      menu_name_english,
      menu_describe_thai,
      menu_describe_english,
      menu_price,
      menu_cost,
      menu_category_id,
      menu_option_id,
    } = req.body;
    if (
      !(
        menu_id &&
        menu_name_thai &&
        menu_name_english &&
        menu_describe_thai &&
        menu_describe_english &&
        menu_cost &&
        menu_price &&
        Array.isArray(menu_category_id) &&
        Array.isArray(menu_option_id)
      )
    ) {
      return res.json({
        response: [],
        error: "input required",
      });
    }
    const optionIds = menu_option_id
      ? Array.isArray(menu_option_id)
        ? menu_option_id
        : [menu_option_id]
      : [];
    await MenuModel.findOneAndUpdate(
      { menu_id: menu_id },
      {
        menu_name: {
          thai: menu_name_thai,
          english: menu_name_english,
        },
        menu_describe: {
          thai: menu_describe_thai,
          english: menu_describe_english,
        },
        menu_price: menu_price,
        menu_cost: menu_cost,
        menu_category_id: menu_category_id,
        menu_option_id: optionIds,
      },
      { new: true }
    ).then(() => {
      res.status(200).json({
        response: [{ message: "update menu success" }],
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
exports.delete_menu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    if (!menu_id) {
      return res.status(400).json({
        response: "",
        error: "input required",
      });
    }
    const removed = await MenuModel.findOneAndDelete({ menu_id: menu_id });
    if (removed) {
      await fs.unlink("./images/" + removed.menu_image, (err) => {
        if (err) {
          return res.status(400).json({
            response: [],
            error: `${err}`,
          });
        }
        res.status(200).json({
          response: [{ message: "remove menu success" }],
          error: "",
        });
      });
    } else {
      res.json({
        response: [],
        error: `invalid menu_id`,
      });
    }
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.change_status_menu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const { status } = req.body;
    if (!menu_id && status) {
      return res.status(400).json({
        response: "",
        error: "input required",
      });
    }
    await MenuModel.findOneAndUpdate(
      { menu_id: menu_id },
      { menu_status: status },
      { new: true }
    ).then(() => {
      res.status(200).json({
        response: [{ message: "update menu status success" }],
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
