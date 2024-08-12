const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user_model");
const AccountModel = require("../models/account_model");
const bcrypt = require("bcryptjs");

// PROTECTED
exports.get_user = async (req, res) => {
  try {
    await UserModel.find({}).then((data) => {
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
exports.getone_user = async (req, res) => {
  try {
    const { user_id } = req.params;
    await UserModel.findOne({ user_id: user_id }).then((data) => {
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
exports.create_user = async (req, res) => {
  try {
    const {
      user_fullname,
      user_nickname,
      user_telnum,
      user_role,
      user_access_rights,
      account_username,
      account_password,
    } = req.body;
    if (
      !(
        user_fullname &&
        user_nickname &&
        user_telnum &&
        user_role &&
        user_access_rights &&
        account_username &&
        account_password
      )
    ) {
      return res.status(400).json({
        response: [],
        error: "input Required",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(account_password, salt);
    const uuid = await uuidv4();
    await UserModel.create({
      user_id: uuid,
      user_fullname: user_fullname,
      user_nickname: user_nickname,
      user_telnum: user_telnum,
      user_role: user_role,
      user_access_rights: user_access_rights,
    }).then(() => {
      AccountModel.create({
        user_id: uuid,
        account_username: account_username,
        account_password: hashpassword,
      }).then(() => {
        res.status(200).json({
          response: [{ message: "create user success" }],
          error: "",
        });
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
exports.update_user = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { c, user_nickname, user_telnum, user_role, user_access_rights } =
      req.body;
    if (
      !(
        user_fullname &&
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
        user_fullname: user_fullname,
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
exports.delete_user = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({
        response: [],
        err: "input required",
      });
    }
    await UserModel.findOneAndDelete({ user_id: user_id }).then(() => {
      AccountModel.findOneAndDelete({ user_id: user_id }).then(() => {
        res.status(200).json({
          response: [{ message: "delete user success" }],
          err: "",
        });
      });
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
