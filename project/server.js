const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
require("./config/passport")(passport);

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use("/images", express.static("images"));
// app.use(passport.session());
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log(`Connected to database successfully`))
  .catch((err) => console.log(`Error : ${err}`));

// unprotected
app.use("/auth", require("./routes/auth_route"));
app.use("/option", require("./routes/option_route/unportected_option_route"));
app.use(
  "/category",
  require("./routes/category_route/unprotected_category_route")
);
app.use("/menu", require("./routes/menu_route/unprotected_menu"));

// protected
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  require("./routes/user_route/user_route")
);
app.use(
  "/option",
  passport.authenticate("jwt", { session: false }),
  require("./routes/option_route/protected_option_route")
);
app.use(
  "/category",
  passport.authenticate("jwt", { session: false }),
  require("./routes/category_route/protected_category_route")
);
app.use(
  "/menu",
  passport.authenticate("jwt", { session: false }),
  require("./routes/menu_route/protected_menu")
);
app.use(
  "/zone",
  passport.authenticate("jwt", { session: false }),
  require("./routes/zone_route")
);

const port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
