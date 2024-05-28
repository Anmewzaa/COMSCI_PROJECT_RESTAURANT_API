const express = require("express");
const router = express.Router();

const { get, create, update } = require("../../controllers/user_controller");

router.get("/get", get);
router.post("/create", create);
router.put("/update/:user_id", update);

module.exports = router;
