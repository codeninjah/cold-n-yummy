const express = require('express')
const ejs = require('ejs')
const { Sequelize, Model, DataTypes } = require("sequelize")
const {Icecream, Users} = require('./models/index')


const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//This also works with testConnection()
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/icecream.sqlite'
});

app.get('/', async(req, res) => {
    const icecreams = await Icecream.findAll()
    res.render('index', {icecreams})
})

//Need to work with this
app.post('/vote', async(req, res) => {
    console.log("Works")
    const { username, email, ice_id } = req.body

    const user = await Users.findOne({where: {email: email}})
    const icecream = await Icecream.findOne({where: {ice_id: ice_id}})

    if(!user){
        const user = await Users.create({
            name: username,
            email: email
        })

        icecream.likes++
        icecream.save()
    }

res.redirect('/')

})


app.get('/top10', async(req, res) => {
    const iceCreamList = await Icecream.findAll({
        limit: 10,
        order: sequelize.literal('likes DESC')
    })
    
    res.render('top10', {iceCreamList})
})

app.listen(8000, () => {
    console.log("App up and running")
})