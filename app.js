const express = require('express')
const ejs = require('ejs')
const { Sequelize, Model, DataTypes } = require("sequelize")
const {Icecream, Users} = require('./models/index')
const bodyParser = require('body-parser')


const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
    const { username, email, ice_id } = req.body
    console.log(username)
    console.log("Id is " + ice_id)

    //Kollar om user finns utifrån angivet email
    const user = Users.findOne({where: {email: email}})

    // Om user inte finns, då skapas det ett
    if(user === null) {
    Users.sync()
    .then(() => {
        return Users.create({
            name: username,
            email: email
        })
    })
    .then((data) => {
        console.log(data.toJSON())
    })
    .catch((err) => {
        console.error(err)
    })
}
    else{
        console.log("User already exists")
    }


    Icecream.sync()
    .then(() => {
        return Icecream.findOne({
            where: {
                ice_id: ice_id,
            }
        })
    })
    .then((data) => {
        data.likes++
        data.save()
        console.log(data.toJSON())
        //console.log("Object is: " + JSON.parse(res.body))
    })
    /*
    .then(() => {
        return Icecream.update({name: "Alex"})//data.update({likes: likes++})
    })
    .then((data) => {
        console.log(data)
    })
    */
    .catch((err) => {
        console.log(err)
    })
})


app.get('/top10', (req, res) => {
    const iceCreamList = []
    Icecream.sync()
        .then(() => {
            return Icecream.findAll({
                limit: 10,
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