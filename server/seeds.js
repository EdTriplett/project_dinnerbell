const User = require("./models/User");
const Recipe = require("./models/Recipe");
const Meal = require("./models/Meal");
const mongooseeder = require("mongooseeder");
const faker = require("faker");
const mongoose = require("mongoose");
const uuid4 = require("uuid/v4");
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
      edamamId: uuid4(),
      ingredients: [...Array(3)].map(() => faker.random.words(5)),
      owner: users[Math.floor(i % 10)]
    });
    recipes.push(recipe);
  }
  let meal = new Meal({
    name: "meal",
    owner: users[0],
    recipes: recipes[0],
    unregisteredGuests: "Leo",
    registeredGuests: users[1],
    image:
      "https://www.snapfinger.com/api/content/managedimage/Zaxbys/18383/zaxbys-chickenfingerplate-OH.png?maxWidth=385&maxHeight=385",
    tasks: ["prepare food", "eat food"]
  });
  const promises = [...users, ...recipes, meal].map(resource =>
    resource.save()
  );

  return Promise.all(promises);
};

mongooseeder.seed({
  mongodbUrl: require("./config/mongoURL"),
  mongoose,
  clean: true,
  models: {
    User,
    Recipe,
    Meal
  },
  seeds
});
