const { Sequelize, Model, DataTypes } = require("sequelize")
const {Icecream, Users } = require('../models/index.js')

//This also works with testConnection()
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/icecream.sqlite'
});

Icecream.sync()
.then(() => {
    console.log("Icecream tastes table created")
    return Icecream.bulkCreate([
        {
            name: "Jordgubbsmak",
            likes: 0,
            emails: []
        },
        {
            name: "Chocklad",
            likes: 7,
            emails: [],
        },
        {
            name: "Caramel",
            likes: 3,
            emails: [],
        },
        {
            name: "Vanilla",
            likes: 4,
            emails: [],
        },
        {
            name: "Coco",
            likes: 0,
            emails: [],
        },
        {
            name: "Banana",
            likes: 8,
            emails: [],
        },
        {
            name: "Apple",
            likes: 0,
            emails: []
        },
        {
            name: "Nougat",
            likes: 7,
            emails: [],
        },
        {
            name: "Lakris",
            likes: 3,
            emails: [],
        },
        {
            name: "Vanilla-Coco",
            likes: 4,
            emails: [],
        },
        {
            name: "Pear",
            likes: 0,
            emails: [],
        },
        {
            name: "Surprise",
            likes: 8,
            emails: [],
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

