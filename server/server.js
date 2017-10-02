const express = require("express");
const app = express();

const mongoose = require("./mongo");
const mongoose.Promise = require('bluebird')
app.use((req, res, next) => {
  if (mongoose.connection.readyState) next();
  else require("./mongo")()
    .then(() => next())
    .catch(e=>next(e))
});

const bodyParser = require("body-parser")
app.use(bodyParser.json());

//Morgan
const morgan = require("morgan");
const morganToolkit = require('morgan-toolkit')(morgan);
app.use(morganToolkit());

//
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./strategies')(passport)


const cors = require('cors')
app.use(cors());

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const store = new MongoDBStore(
      {
        uri: require('./config/mongoURL'),
        collection: 'mySessions'
      });


app.use(
  session({
    store,
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET || 'dinnerbell'
  })
);




app.use((error, req, res, next)=>{
  console.error(error.stack);
})

const port = process.env.PORT || process.argv[2] || 3001;
const host = "localhost";
const args = process.env.NODE_ENV === "production" ? ([port]) : ([port, host]);
args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen(app, ...args);

module.exports = app;




