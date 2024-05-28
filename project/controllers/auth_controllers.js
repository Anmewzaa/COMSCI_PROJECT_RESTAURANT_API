const UserModel = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).json({
        response: [],
        error: "input required",
      });
    }
    var _user = await UserModel.findOne({ username: username });
    if (_user) {
      if (await bcrypt.compare(password, _user.password)) {
        const token = jwt.sign(
          {
            user_id: _user.user_id,
            user_name: _user.user_name,
            user_nickname: _user.user_nickname,
            user_telnum: _user.user_telnum,
            user_role: _user.user_role,
            user_access_rights: _user.user_access_rights,
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
