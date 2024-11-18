const express = require("express");
const router = express.Router();

const {
  getone_table,
  add_order_table,
} = require("../../controllers/table_controller");

// GET
router.get("/get/:id", getone_table);
// PUT
router.put("/add/:_id", add_order_table);

module.exports = router;
