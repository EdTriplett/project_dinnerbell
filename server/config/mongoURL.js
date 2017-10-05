const env = process.env.NODE_ENV || "development";
const config = require("./mongoose.json")[env];
module.exports =
<<<<<<< HEAD
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;
=======
	process.env.NODE_ENV === "production"
		? process.env[config.use_env_variable]
		: process.env.DB_URI;
>>>>>>> 42ac74b944ec18b0565e9bbc7987a2579405c39d
