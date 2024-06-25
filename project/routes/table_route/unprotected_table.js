const express = require("express");
const router = express.Router();

const { get_table } = require("../../controllers/table_controller");

// GET
router.get("/get", get_table);

module.exports = router;
