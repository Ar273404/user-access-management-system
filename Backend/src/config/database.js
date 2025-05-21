// const { DataSource } = require("typeorm");
// const dotenv = require("dotenv");

// dotenv.config();

// const { User } = require("../entities/User.js");
// const { Software } = require("../entities/Software.js");
// const { Request } = require("../entities/Request.js");

// const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: true,
//   entities: [User, Software, Request],
// });
// // console.log(AppDataSource)

// module.exports = AppDataSource;

const { DataSource } = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();

const { User } = require("../entities/User.js");
const { Software } = require("../entities/Software.js");
const { Request } = require("../entities/Request.js");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Software, Request], // ✅ these must be EntitySchemas
});

module.exports = AppDataSource;
