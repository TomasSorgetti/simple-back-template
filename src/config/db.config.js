require("dotenv").config();
module.exports = {
  dbHost: process.env.DB_HOST || "",
  dbUser: process.env.DB_USER || "",
  dbPass: process.env.DB_PASSWORD || "",
  dbName: process.env.DB_NAME || "",
  dbPort: process.env.DB_PORT || 3306,
  dbDialect: process.env.DB_DIALECT || "mysql",
};
