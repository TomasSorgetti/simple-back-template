const server = require("./src/app.js");
const { serverConfig } = require("./src/config/index.config");
const { syncDatabase } = require("./src/database/connection");

syncDatabase()
  .then(() => {
    server.listen(serverConfig.port, () => {
      console.log(`- - - - - - - - - - - - - - -`);
      console.log(`Server listening on port ${serverConfig.port}`);
      console.log(`- - - - - - - - - - - - - - -`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
