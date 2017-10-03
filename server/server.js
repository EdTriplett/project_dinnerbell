// App
const express = require("express");
const app = express();

// Config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Database
const mongoose = require("mongoose");
app.use(async (req, res, next) => {
  try {
    if (!mongoose.connection.readyState) await require("./util/mongo")();
    next();
  } catch (error) {
    next(error);
  }
});

// Post Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Logging
if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  const morganToolkit = require("morgan-toolkit")(morgan);
  app.use(morganToolkit());
}

// Authentication
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
require("./strategies")(passport);

// Resource Sharing
const cors = require("cors");
app.use(cors());

// Session
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: require("./config/mongoURL"),
  collection: "mySessions"
});
const sessionOpts = {
  store,
  saveUninitialized: false,
  resave: false,
  secret: process.env.SECRET || "dinnerbell"
};
app.use(session(sessionOpts));

// Routes
app.use("/auth", require("./routes/auth")(passport));
app.use("/api/recipes", require("./routes/recipes"));
app.use("/api/users", require("./routes/users"));
app.use("/api/ratings", require("./routes/ratings"));
app.use("/api/meals", require("./routes/meals"));

app.all("/*", (req, res, next) => {
  let err = new Error("404: resource not found");
  err.stack = `404: invalid resource requested: ${req.path}`;
  next(err);
});

// Error Handler
app.use((error, req, res, next) => {
  res.json({ error: error.message });
  console.error(error.stack);
});

// Start Up!
const port = process.env.PORT || process.argv[2] || 3001;
const host = "localhost";
const args = process.env.NODE_ENV === "production" ? [port] : [port, host];
args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen(...args);

module.exports = app;
