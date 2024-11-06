const DailyModel = require("../models/daily_models");
const moment = require("moment");

// PROTECTED
exports.get_dailydata = async (req, res) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfWeek = moment().startOf("week").toDate();
  const endOfWeek = moment().endOf("week").toDate();

  try {
    const check = await DailyModel.findOne({ date: startOfToday });
    if (!check) {
      await DailyModel.create({ date: startOfToday });
    }
    const weeklyData = await DailyModel.find({
      date: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    }).populate("menus.menu");

    const aggregatedData = weeklyData.reduce(
      (acc, item) => {
        acc.visits += item.visits || 0;
        acc.orders += item.orders || 0;
        acc.tables += item.tables || 0;

        const dayName = moment(item.date).format("dddd");

        acc.incomeMap[dayName] =
          (acc.incomeMap[dayName] || 0) + (item.income || 0);
        acc.profitMap[dayName] =
          (acc.profitMap[dayName] || 0) + (item.profit || 0);

        item.menus.forEach((menuItem) => {
          const menuId = menuItem.menu._id;
          if (acc.menus[menuId]) {
            acc.menus[menuId].amount += menuItem.amount || 0;
          } else {
            acc.menus[menuId] = {
              menu: menuItem.menu,
              amount: menuItem.amount || 0,
            };
          }
        });

        return acc;
      },
      {
        visits: 0,
        orders: 0,
        tables: 0,
        incomeMap: {},
        profitMap: {},
        menus: {},
      }
    );

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const money = daysOfWeek.flatMap((day) => [
      { day, amount: aggregatedData.incomeMap[day] || 0, type: "Income" },
      { day, amount: aggregatedData.profitMap[day] || 0, type: "Profit" },
    ]);

    const formattedMenus = Object.values(aggregatedData.menus).map(
      (menuItem) => ({
        type: menuItem.menu.menu_name.thai,
        value: menuItem.amount,
      })
    );

    res.json({
      response: {
        visits: aggregatedData.visits,
        orders: aggregatedData.orders,
        tables: aggregatedData.tables,
        money: money,
        menus: formattedMenus,
      },
      error: "",
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.get_alldailydata = async (req, res) => {
  try {
    DailyModel.find({}).then((data) => {
      res.json({
        response: data,
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.update_visits_dailydata = async (req, res) => {
  const { amount } = req.params;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  try {
    const check = await DailyModel.findOne({ date: startOfToday });
    if (!check) {
      await DailyModel.create({ date: startOfToday });
    }
    await DailyModel.findOneAndUpdate(
      { date: startOfToday },
      { $inc: { visits: amount } },
      { new: true }
    ).then((data) => {
      res.json({
        response: data,
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.update_orders_dailydata = async (req, res) => {
  const { amount } = req.params;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  try {
    const check = await DailyModel.findOne({ date: startOfToday });
    if (!check) {
      await DailyModel.create({ date: startOfToday });
    }
    await DailyModel.findOneAndUpdate(
      { date: startOfToday },
      { $inc: { orders: amount } },
      { new: true }
    ).then((data) => {
      res.json({
        response: data,
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.update_tables_dailydata = async (req, res) => {
  const { amount } = req.params;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  try {
    const check = await DailyModel.findOne({ date: startOfToday });
    if (!check) {
      await DailyModel.create({ date: startOfToday });
    }
    await DailyModel.findOneAndUpdate(
      { date: startOfToday },
      { $inc: { tables: amount } },
      { new: true }
    ).then((data) => {
      res.json({
        response: data,
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.update_income_dailydata = async (req, res) => {
  const { amount } = req.params;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  try {
    const check = await DailyModel.findOne({ date: startOfToday });
    if (!check) {
      await DailyModel.create({ date: startOfToday });
    }
    await DailyModel.findOneAndUpdate(
      { date: startOfToday },
      { $inc: { income: amount } },
      { new: true }
    ).then((data) => {
      res.json({
        response: data,
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.update_profit_dailydata = async (req, res) => {
  const { amount } = req.params;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  try {
    const check = await DailyModel.findOne({ date: startOfToday });
    if (!check) {
      await DailyModel.create({ date: startOfToday });
    }
    await DailyModel.findOneAndUpdate(
      { date: startOfToday },
      { $inc: { profit: amount } },
      { new: true }
    ).then((data) => {
      res.json({
        response: data,
        error: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.update_menus_dailydata = async (req, res) => {
  const { menu_id, amount } = req.body;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  try {
    const check = await DailyModel.findOne({ date: startOfToday });
    if (!check) {
      await DailyModel.create({ date: startOfToday });
    }
    const existingMenu = check.menus.find(
      (item) => item.menu.toString() === menu_id
    );
    if (existingMenu) {
      await DailyModel.findOneAndUpdate(
        {
          date: startOfToday,
          "menus.menu": menu_id,
        },
        { $inc: { "menus.$.amount": amount } },
        { new: true }
      );
    } else {
      await DailyModel.findOneAndUpdate(
        { date: startOfToday },
        { $push: { menus: { menu: menu_id, amount } } },
        { new: true }
      );
    }
    res.json({
      response: ["Success"],
      error: "",
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
