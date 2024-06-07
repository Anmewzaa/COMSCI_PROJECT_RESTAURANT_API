const express = require("express");
const router = express.Router();

const { get_menu, getone_menu } = require("../../controllers/menu_controller");

// GET
router.get("/get", get_menu);
router.get("/get/:menu_id", getone_menu);

module.exports = router;
