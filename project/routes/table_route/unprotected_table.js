const express = require("express");
const router = express.Router();

const {
  get_table,
  getone_table,
} = require("../../controllers/table_controller");

// GET
router.get("/get", get_table);
router.get("/get/:id", getone_table);

module.exports = router;
