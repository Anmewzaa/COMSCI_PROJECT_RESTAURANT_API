const express = require("express");
const router = express.Router();

const { create_menu } = require("../../controllers/menu_controller");
const { upload } = require("../../middlewares/multer");

// CREATE
router.post("/create", upload, create_menu);
// UPDATE

// DELETE

module.exports = router;
