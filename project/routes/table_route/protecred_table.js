const express = require("express");
const router = express.Router();

const {
  get_table,
  create_table,
  edit_table,
  delete_table,
  open_table,
  close_table,
  remove_order_table,
  change_status_order_table,
  check_bill,
} = require("../../controllers/table_controller");

// GET
router.get("/get", get_table);
// POST
router.post("/create", create_table);
// PUT
router.put("/update/:_id", edit_table);
router.put("/open/:_id", open_table);
router.put("/close/:_id", close_table);
router.put("/delete/:_id", remove_order_table);
router.put("/change_status/:_id", change_status_order_table);
router.put("/checkbill/:_id", check_bill);
// DELETE
router.delete("/delete/:id", delete_table);

module.exports = router;
