const express = require("express");
const router = express.Router();

const { get_category } = require("../../controllers/category_controller");

// GET
router.get("/get", get_category);

module.exports = router;
