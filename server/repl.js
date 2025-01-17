let repl = require("repl").start({});
const mongoose = require("mongoose");

const models = {
  User: require("./models/User"),
  Rating: require("./models/Rating"),
  Recipe: require("./models/Recipe"),
  Meal: require("./models/Meal"),
  Picture: require("./models/Picture")
};

// connect
require("./util/mongo")().then(() => {
  // Set `models` global
  repl.context.models = models;

  // model globals
  Object.keys(models).forEach(modelName => {
    repl.context[modelName] = mongoose.model(modelName);
  });

  // logger
  repl.context.lg = data => console.log(data);
});
