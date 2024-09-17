const express = require("express");
const router = express.Router();

const {
  get_menu,
  getone_menu,
  get_menu_from_category,
} = require("../../controllers/menu_controller");

// GET
router.get("/get", get_menu);
router.get("/get/:menu_id", getone_menu);
router.get("/getfromcate/:_id", get_menu_from_category);

module.exports = router;
