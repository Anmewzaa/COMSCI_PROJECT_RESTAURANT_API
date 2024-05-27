const express = require("express");
const router = express.Router();

const { get, create } = require("../../controllers/user/user_controller");

router.get("/get", get);
router.post("/create", create);

module.exports = router;
