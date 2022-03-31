const { Sequelize, Model, DataTypes } = require("sequelize")
const {Icecream, Users } = require('../models/index.js')

//This also works with testConnection()
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './icecream.sqlite'
});

Icecream.sync()
.then(() => {
    console.log("Icecream tastes table created")
    return Icecream.bulkCreate([
        {
            name: "Jordgubbsmak",
            likes: 0,
        },
        {
            name: "Chocklad",
            likes: 0,
        },
        {
            name: "Caramel",
            likes: 0,
        },
        {
            name: "Vanilla",
            likes: 0,
        },
        {
            name: "Coco",
            likes: 0,
        },
        {
            name: "Banana",
            likes: 0
        },
    ])
    .then((data) => {
        data.forEach((element) => {
            console.log(element.toJSON())
        })
    })
    .catch((err) => {
        console.error(err)
    })
})

