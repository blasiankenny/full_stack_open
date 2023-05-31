const express = require("express");
const usersRouter = require("./controllers/users");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogController");
// const middleware = require("./utils/middleware");
// const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
// app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

// app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

module.exports = app;
