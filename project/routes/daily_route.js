const express = require("express");
const router = express.Router();

const {
  get_dailydata,
  get_alldailydata,
  update_visits_dailydata,
  update_orders_dailydata,
  update_tables_dailydata,
  update_income_dailydata,
  update_profit_dailydata,
  update_menus_dailydata,
  update_dailydata,
} = require("../controllers/daily_controller");

// GET
router.get("/get", get_dailydata);
router.get("/getall", get_alldailydata);
// POST
router.put("/update/dayly", update_dailydata);
router.put("/update/visits/:amount", update_visits_dailydata);
router.put("/update/orders/:amount", update_orders_dailydata);
router.put("/update/tables/:amount", update_tables_dailydata);
router.put("/update/income/:amount", update_income_dailydata);
router.put("/update/profit/:amount", update_profit_dailydata);
router.put("/update/menus", update_menus_dailydata);

module.exports = router;
