const express = require("express");
const router = express.Router();

const {
  get_category,
  getone_category,
} = require("../../controllers/category_controller");

// GET
router.get("/get", get_category);
router.get("/get/:category_id", getone_category);

module.exports = router;
