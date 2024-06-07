const express = require("express");
const router = express.Router();

const {
  get_option,
  getone_option,
} = require("../../controllers/option_controller");

// GET
router.get("/get", get_option);
router.get("/get/:option_id", getone_option);

module.exports = router;
