const express = require("express");
const router = express.Router();

const {
  create_table,
  open_table,
  close_table,
  add_order_table,
  remove_order_table,
} = require("../../controllers/table_controller");

// POST
router.post("/create", create_table);
router.put("/open/:table_id", open_table);
router.put("/close/:table_id", close_table);
router.put("/add/:table_id", add_order_table);
router.put("/delete/:table_id", remove_order_table);

module.exports = router;
