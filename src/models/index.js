const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/configDB.json")[env];

const { host, port, user, password, database } = config;
const db = {};

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

fs.readdirSync(__dirname)
    .filter(function (file) {
        return file.indexOf(".") !== 0 && file !== "index.js";
    })
    .forEach(function (file) {
        let model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

// Object.keys(db).forEach(function(modelName) {
//     if ("associate" in db[modelName]) {
//         db[modelName].associate(db);
//     }
// });

db.sequelize = sequelize;
module.exports = db;
