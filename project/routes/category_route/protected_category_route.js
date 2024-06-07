const express = require("express");
const router = express.Router();

const {
  create_category,
  update_category,
  delete_category,
} = require("../../controllers/category_controller");

// CREATE
router.post("/create", create_category);
// UPDATE
router.put("/update/:category_id", update_category);
// DELETE
router.delete("/delete/:category_id", delete_category);

module.exports = router;
