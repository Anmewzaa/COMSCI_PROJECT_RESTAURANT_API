const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user_model");
const bcrypt = require("bcryptjs");

//
exports.get = async (req, res) => {
  try {
    await UserModel.find({}).then((data) => {
      const filteredData = data.map((item) => {
        return {
          user_id: item.user_id,
          user_name: item.user_name,
          user_nickname: item.user_nickname,
          user_telnum: item.user_telnum,
          user_role: item.user_role,
          user_access_rights: item.user_access_rights,
        };
      });
      res.json({
        response: [filteredData],
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
//
exports.create = async (req, res) => {
  try {
    const {
      user_name,
      user_nickname,
      user_telnum,
      user_role,
      user_access_rights,
      username,
      password,
    } = req.body;
    if (
      !(
        user_name &&
        user_nickname &&
        user_telnum &&
        user_role &&
        user_access_rights &&
        username &&
        password
      )
    ) {
      return res.status(400).json({
        response: [],
        error: "input Required",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    await UserModel.create({
      user_id: uuidv4(),
      user_name: user_name,
      user_nickname: user_nickname,
      user_telnum: user_telnum,
      user_role: user_role,
      user_access_rights: user_access_rights,
      username: username,
      password: hashpassword,
    }).then(() => {
      res.status(200).json({
        response: [{ message: "create user success" }],
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
//
exports.update = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      user_name,
      user_nickname,
      user_telnum,
      user_role,
      user_access_rights,
    } = req.body;
    if (
      !(
        user_name &&
        user_nickname &&
        user_telnum &&
        user_role &&
        user_access_rights
      )
    ) {
      return res.status(400).json({
        response: [],
        err: "input required",
      });
    }
    await UserModel.findOneAndUpdate(
      { user_id: user_id },
      {
        user_name: user_name,
        user_nickname: user_nickname,
        user_telnum: user_telnum,
        user_role: user_role,
        user_access_rights: user_access_rights,
      }
    ).then(() => {
      res.status(200).json({
        response: [{ message: "update user success" }],
        err: "",
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
