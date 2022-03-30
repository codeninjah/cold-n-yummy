const express = require('express')
const ejs = require('ejs')


const app = express()
app.set('view engine', 'ejs')



app.listen(8000, () => {
    console.log("App up and running")
})