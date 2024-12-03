const express = require("express");
const router = express.Router();

const {
  get_static,
  create_static,
} = require("../controllers/static_controller");

// GET
router.get("/get", get_static);
// CREATE
router.post("/create", create_static);

module.exports = router;
