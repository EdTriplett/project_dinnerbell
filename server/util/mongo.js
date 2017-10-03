const mongoose = require("mongoose");
module.exports = () => {
  mongoose.Promise = require("bluebird");
  return mongoose.connect(require("../config/mongoURL"), {
    useMongoClient: true
  });
};
