const express = require("express");
const router = express.Router();

const { getone_table } = require("../../controllers/table_controller");

// GET
router.get("/get/:id", getone_table);

module.exports = router;
