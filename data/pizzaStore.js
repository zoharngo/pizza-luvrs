const Sequelize = require('sequelize');

const db = 'pizza_luvers';
const host = 'aa6yflzyg8kfko.cn1zhamduzzy.eu-central-1.rds.amazonaws.com';
const username = 'sapostgresql';
const pass = 'Ba2251985';

const pgClient = new Sequelize(
    db,
    username,
    pass,
    {
        host: host,
        dialect: 'postgres'
    }
);

const Pizza = pgClient.define('pizza', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    toppings: {
        type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    created: {
        type: Sequelize.BIGINT
    },
});

Pizza.sync().then(() => {
    console.log("postgres connection ready");
});

module.exports = Pizza;
