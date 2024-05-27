const UserModel = require("../models/user/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).json({
        response: [],
        error: "Input required",
      });
    }
    var _user = await UserModel.findOne({ username: username });
    if (_user) {
      if (await bcrypt.compare(password, _user.password)) {
        const token = jwt.sign(
          {
            user_name: _user.user_name,
            user_nickname: _user.user_nickname,
            user_telnum: _user.user_telnum,
            user_role: _user.user_role,
            user_access_rights: _user.user_access_rights,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        return res.json({
          response: [token],
          error: "",
        });
      }
    }
    return res.json("Not Pass");
  } catch (err) {
    res.json({
      response: [],
      error: `${err}`,
    });
  }
};
