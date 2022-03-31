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

    //res.render('index', {iceCreamList})
})

//Will work with this
app.post('/', (req, res) => {

})


app.get('/top10', (req, res) => {
    res.render('top10')
})


app.listen(8000, () => {
    console.log("App up and running")
})