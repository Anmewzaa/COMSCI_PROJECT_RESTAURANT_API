const express = require("express");
const router = express.Router();

const {
  get_zone,
  getone_zone,
  create_zone,
  update_zone,
  delete_zone,
} = require("../controllers/zone_controller");

// GET
router.get("/get", get_zone);
router.get("/get/:zone_id", getone_zone);
// CREATE
router.post("/create", create_zone);
// UPDATE
router.put("/update/:zone_id", update_zone);
// DELETE
router.delete("/delete/:zone_id", delete_zone);

module.exports = router;
