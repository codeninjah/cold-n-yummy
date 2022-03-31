const express = require('express')
const ejs = require('ejs')
const { Sequelize, Model, DataTypes } = require("sequelize")
const {Icecream, Users} = require('./models/index')


const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))


//This also works with testConnection()
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/icecream.sqlite'
});

app.get('/', (req, res) => {
    const iceCreamList = []
    Icecream.sync()
        .then(() => {
            return Icecream.findAll()
        })
        .then((data) => {
            data.forEach((element) => {
                console.log(element.toJSON())
                iceCreamList.push(element.toJSON())
            })
        })
        .catch((err) => {
            console.log(err)
        })

    res.render('index')
})

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