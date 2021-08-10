const express = require('express')
const ejsLayout = require('express-ejs-layouts')
//fs is a built in module
const fs = require('fs')
const app = express()
app.set('view engine', 'ejs')

app.use(ejsLayout)
app.get('/',(req, res)=>{
    const dogs = fs.readFileSync('./dogs.json')
    //since the data is in json format we need to parse it to display into readable format.
    const dogData = JSON.parse(dogs)
    res.render('home', {dogData})
})

app.listen('4000')