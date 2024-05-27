const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log(`Connected to database successfully`))
  .catch((err) => console.log(`Error : ${err}`));

app.use("/auth", require("./routes/auth_route"));
app.use("/user", require("./routes/user/user_route"));

const port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
