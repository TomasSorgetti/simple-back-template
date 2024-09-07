const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));
app.use("/health", (req, res) => {
  res.send("OK");
});

app.use(errorHandler);

module.exports = app;
