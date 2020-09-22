const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const PORT = 5000;

app.set("PORT", PORT);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log(req.url);
  if (req.query.authorized !== "1") {
    res.status(401);
    return;
  }
  next();
});

app.use((req, res) => res.send("hi"));

app.listen(5000, () => {
  console.log(`listening on ${app.settings.PORT}`);
});
