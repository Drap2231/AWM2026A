const {Sequelize} = require("sequelize");
const env = require("./env");

module.exports.createSequelize = () => {
    const seq = new Sequelize(env.db.name, env.db.user)
}