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

module.exports = { sequelize };

require("./models/user.model");
require("./assosiations");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database & tables synchronized successfully.");
  } catch (err) {
    console.error("Unable to sync the database:", err);
    throw err;
  }
}

module.exports.syncDatabase = syncDatabase;
