const express = require("express");
const router = express.Router();

const { create_option } = require("../../controllers/option_controller");

// CREATE
router.post("/create", create_option);
// UPDATE

// DELETE

module.exports = router;
