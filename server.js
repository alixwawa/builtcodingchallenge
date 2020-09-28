const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// const PORT = process.env.PORT || 3000;

const app = express();

// app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


//testbudget is the test database
//budget is the actual database
//switch if you need to

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/testbudget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./controller/api.js"));

// app.listen(PORT, () => {
//   console.log(
//     "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//     PORT,
//     PORT
//   );
// });

module.exports = app;