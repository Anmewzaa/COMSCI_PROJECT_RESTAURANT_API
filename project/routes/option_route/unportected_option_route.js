const express = require("express");
const router = express.Router();

const { get_option } = require("../../controllers/option_controller");

// GET
router.get("/get", get_option);

module.exports = router;
