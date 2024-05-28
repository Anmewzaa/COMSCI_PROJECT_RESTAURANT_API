const express = require("express");
const router = express.Router();

const { create_category } = require("../../controllers/category_controller");

// CREATE
router.post("/create", create_category);
// UPDATE

// DELETE

module.exports = router;
