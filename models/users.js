const {Sequelize, Model, DataTypes} = require('sequelize')

class Users extends Model{}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './icecream.sqlite'
});

Users.init({
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
}, {sequelize} )

module.exports = Users