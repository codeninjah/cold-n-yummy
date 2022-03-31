const express = require('express')
const ejs = require('ejs')
const { Sequelize, Model, DataTypes } = require("sequelize")


const app = express()
app.set('view engine', 'ejs')


//This also works with testConnection()
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/icecream.sqlite'
});

async function testConnection(){
    try {
        await sequelize.authenticate()
        console.log("Connection has been established succesfully")
    } catch (error) {
        console.error("Unable to connect to the database:" , error)
    }
}

testConnection()



app.listen(8000, () => {
    console.log("App up and running")
})