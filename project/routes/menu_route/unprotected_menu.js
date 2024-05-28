const express = require("express");
const router = express.Router();

const { get_menu } = require("../../controllers/menu_controller");

// GET
router.get("/get", get_menu);

module.exports = router;
