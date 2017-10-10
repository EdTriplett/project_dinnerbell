const User = require("./models/User");
const Recipe = require("./models/Recipe");
const mongooseeder = require("mongooseeder");
const faker = require("faker");
const mongoose = require("mongoose");
const uuid = require("uuid/v1");
mongoose.Promise = require("bluebird");

const seeds = async () => {
  await mongoose.connection.db.dropDatabase();
  let users = [];
  for (let i = 0; i < 10; i++) {
    let user = new User({
      username: faker.random.words(2),
      email: faker.internet.email(),
      password: "password"
    });
    users.push(user);
  }
  let recipes = [];
  for (let i = 0; i < 30; i++) {
    let recipe = new Recipe({
      name: faker.random.words(2),
      ingredients: [...Array(3)].map(() => faker.random.words(5)),
      owner: users[Math.floor(i % 10)],
      edamamId: uuid()
    });
    recipes.push(recipe);
  }
  const promises = [...users, ...recipes].map(resource => resource.save());

  return Promise.all(promises);
};

mongooseeder.seed({
  mongodbUrl: require("./config/mongoURL"),
  mongoose,
  clean: true,
  models: {
    User,
    Recipe
  },
  seeds
});
