const routes = require("./routes");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

app.use("/", routes);

mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`);
app.listen(3000, console.log("listening 0n port 3000"));

function errHandler(err, req, res, next) {
  console.log(err);
  res.status(err?.status ? err.status : 500).send(err.message);
}
app.use(errHandler);

function pathHandler(req, res) {
  res.status(501).send("API is not supported");
}
app.use(pathHandler);

module.exports = app;
