const { v4: uuidv4 } = require("uuid");
const StaticModel = require("../models/static_model");

// UNPROTECTED
exports.get_static = async (req, res) => {
  try {
    await StaticModel.find({}).then((data) => {
      res.status(200).json({
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
exports.create_static = async (req, res) => {
  const { date, visits, income, profit } = req.body;

  const currentDate = date;

  try {
    let existingStatic = await StaticModel.findOne({
      static_date: currentDate,
    });

    if (!existingStatic) {
      existingStatic = await StaticModel.create({
        static_id: uuidv4(),
        static_date: currentDate,
        static_info: [],
      });
    }

    existingStatic.static_info.push({
      visits,
      income,
      profit,
    });

    await existingStatic.save();
    res.json({
      response: existingStatic,
      error: "",
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
