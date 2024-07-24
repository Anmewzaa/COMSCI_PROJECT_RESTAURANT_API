const express = require("express");
const router = express.Router();

const {
  create_table,
  open_table,
  close_table,
  add_order_table,
  remove_order_table,
  change_status_order_table,
} = require("../../controllers/table_controller");

// POST
router.post("/create", create_table);
router.put("/open/:_id", open_table);
router.put("/close/:_id", close_table);
router.put("/add/:_id", add_order_table);
router.put("/delete/:table_id", remove_order_table);
router.put("/change_status/:_id", change_status_order_table);

module.exports = router;
