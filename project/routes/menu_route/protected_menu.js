const express = require("express");
const router = express.Router();

const {
  create_menu,
  update_menu,
  delete_menu,
  change_status_menu,
  add_ratings,
} = require("../../controllers/menu_controller");
const { upload } = require("../../middlewares/multer");

// CREATE
router.post("/create", upload, create_menu);
// UPDATE
router.put("/update/:menu_id", update_menu);
router.put("/changestatus/:menu_id", change_status_menu);
router.put("/add_ratings/:menu_id", add_ratings);
// DELETE
router.delete("/delete/:menu_id", delete_menu);

module.exports = router;
