require("dotenv").config();

const express = require("express");
const connectDb = require("./db");

connectDb();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRoutes = require("./routes/user.routes");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT;

app.use("/user", userRoutes);
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => res.json({ user: req.user }));

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
