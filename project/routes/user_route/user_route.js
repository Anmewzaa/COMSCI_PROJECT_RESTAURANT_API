const express = require("express");
const router = express.Router();

const {
  get_user,
  getone_user,
  create_user,
  update_user,
  delete_user,
} = require("../../controllers/user_controller");

router.get("/get", get_user);
router.get("/get/:user_id", getone_user);
router.post("/create", create_user);
router.put("/update/:user_id", update_user);
router.delete("/delete/:user_id", delete_user);

module.exports = router;
