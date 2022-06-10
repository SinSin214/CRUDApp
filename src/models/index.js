const { Sequelize } = require("sequelize");
const config = require("../config/configDB.json");

const { host, port, user, password, database } = config.database;
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: "mysql",
    logging: false,
});

module.exports = {
    User: require("./userModel")(sequelize),
    Article: require("./articleModel")(sequelize),
    Comment: require("./commentModel")(sequelize),
};
