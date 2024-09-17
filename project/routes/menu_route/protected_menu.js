const express = require("express");
const router = express.Router();

const {
  create_menu,
  update_menu,
  delete_menu,
  change_status_menu,
} = require("../../controllers/menu_controller");
const { upload_menu } = require("../../middlewares/multer");

// CREATE
router.post("/create", upload_menu, create_menu);
// UPDATE
router.put("/update/:menu_id", update_menu);
router.put("/changestatus/:menu_id", change_status_menu);
// DELETE
router.delete("/delete/:menu_id", delete_menu);

module.exports = router;
