const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const groupRouter = require("./routes/group");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const topicRouter = require("./routes/topic");
const ExpressError = require("./utils/ExpressError");

dotenv.config({ path: ".env" });

const dbUrl =
  process.env.DB_URL ||
  "mongodb+srv://cis557:pennlobby@pennlobby.3poyg.mongodb.net/cis557?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
// TODO: delete CORS in production
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/topic", topicRouter);
// TODO: more routes

// '*': match any other url if all previous urls do not match
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use(function (req, res, next) {
  next(createError(404));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

module.exports = app;
