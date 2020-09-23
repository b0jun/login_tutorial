const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const PORT = 5000;

app.set("PORT", PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use("/api", require("./src/api"));

app.listen(5000, () => {
  console.log(`listening on ${app.settings.PORT}`);
});
