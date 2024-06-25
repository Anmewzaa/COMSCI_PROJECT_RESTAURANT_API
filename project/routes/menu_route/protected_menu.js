const express = require("express");
const router = express.Router();

const {
  create_menu,
  update_menu,
  delete_menu,
} = require("../../controllers/menu_controller");
const { upload } = require("../../middlewares/multer");

// CREATE
router.post("/create", upload, create_menu);
// UPDATE  !! NEED FIX !!
router.put("/update/:menu_id", update_menu);
// DELETE
router.delete("/delete/:menu_id", delete_menu);

module.exports = router;
