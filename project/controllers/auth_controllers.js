const UserModel = require("../models/user_model");
const AccountModel = require("../models/account_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { account_username, account_password } = req.body;
    if (!(account_username && account_password)) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    var _user = await AccountModel.findOne({
      account_username: account_username,
    });
    if (_user) {
      if (await bcrypt.compare(account_password, _user.account_password)) {
        const userinfo = await UserModel.findOne({
          user_id: _user.user_id,
        });
        const token = jwt.sign(
          {
            user_id: userinfo.user_id,
            user_name: userinfo.user_name,
            user_fullname: userinfo.user_fullname,
            user_nickname: userinfo.user_nickname,
            user_telnum: userinfo.user_telnum,
            user_role: userinfo.user_role,
            user_access_rights: userinfo.user_access_rights,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        return res.json({
          response: [{ token: token }],
          error: "",
        });
      }
    }
    return res.json({
      response: [],
      error: "username or password is invalid",
    });
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
