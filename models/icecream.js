const {Sequelize, Model, DataTypes} = require('sequelize')

class Icecream extends Model{}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/icecream.sqlite'
});

Icecream.init({
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
}, {sequelize} )

module.exports = Icecream