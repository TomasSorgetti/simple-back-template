const { Sequelize } = require("sequelize");
const { dbConfig } = require("../config/index.config");

const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.dbUser,
  dbConfig.dbPass,
  {
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    dialect: dbConfig.dbDialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/user.model")(sequelize, Sequelize);

module.exports = db;