const express = require("express");
const router = express.Router();

const {
  get_table_history,
  create_table_history,
  delete_table_history,
} = require("../controllers/table_history_controller");

// GET
router.get("/get", get_table_history);
// CREATE
router.post("/create", create_table_history);
// UPDATE

// DELETE
router.delete("/delete/:id", delete_table_history);

module.exports = router;
