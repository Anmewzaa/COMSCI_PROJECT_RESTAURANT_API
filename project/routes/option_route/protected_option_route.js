const express = require("express");
const router = express.Router();

const {
  create_option,
  update_option,
  delete_option,
} = require("../../controllers/option_controller");

// CREATE
router.post("/create", create_option);
// UPDATE
router.put("/update/:option_id", update_option);
// DELETE
router.delete("/delete/:option_id", delete_option);

module.exports = router;
