const { Sequelize } = require("sequelize");
const config = require("../config/configDB.json");

const { host, port, user, password, database } = config.database;
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: "mysql",
    logging: false,
    query: {
        raw: true,
    },
});

sequelize.sync();

module.exports = {
    User: require("./user.model")(sequelize),
    Article: require("./article.model")(sequelize),
    Comment: require("./comment.model")(sequelize),
    Role: require("./role.model")(sequelize),
};
