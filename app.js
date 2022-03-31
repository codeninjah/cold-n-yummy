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
            console.log("Längd på array: " + iceCreamList.length)
            res.render('index', {iceCreamList})
            return iceCreamList
        })
        .catch((err) => {
            console.log(err)
        })
})

//Need to work with this
app.post('/', (req, res) => {
    console.log("Works")
    Icecream.sync()
    .then(() => {
        return Icecream.findOne({
            where: {
                id: 2,
            }
        })
    })
    .then((data) => {
        console.log(data.toJSON())
    })
    .catch((err) => {
        console.log(err)
    })
})


app.get('/top10', (req, res) => {
    const iceCreamList = []
    Icecream.sync()
        .then(() => {
            return Icecream.findAll({
                limit: 2,
                order: sequelize.literal('likes DESC')
            })
        })
        .then((data) => {
            data.forEach((element) => {
                console.log(element.toJSON())
                iceCreamList.push(element.toJSON())
            })
            console.log("Längd på array: " + iceCreamList.length)
            res.render('top10', {iceCreamList})
            return iceCreamList
        })
        .catch((err) => {
            console.log(err)
        })
})


app.listen(8000, () => {
    console.log("App up and running")
})