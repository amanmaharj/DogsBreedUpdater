const express = require('express')
const ejsLayout = require('express-ejs-layouts')
const app = express()
app.set('view engine', 'ejs')

app.use(ejsLayout)
app.get('/',(req, res)=>{
    res.render('home', {name: 'Aman Maharjan', age: 21})
})

app.listen('4000')