const express = require('express')
const ejsLayout = require('express-ejs-layouts')
//fs is a built in module
const fs = require('fs')
const app = express()
app.set('view engine', 'ejs')

app.use(ejsLayout)
//Whenever we are sending the some kind of data to the url link, it need to be parse i.e. body.parse this middleware help us to do that in more significant way.
app.use(express.urlencoded({extended: true}))
//it is a homepage
app.get('/dogs',(req, res)=>{
    const dogs = fs.readFileSync('./dogs.json')
    //since the data is in json format we need to parse it to display into readable format.
    const dogData = JSON.parse(dogs)
    res.render('home', {dogData})
})
//It renders the form for creating new name and type of the dogs.
app.get('/dogs/new',(req,res)=>{
    res.render('new')
})

app.post('/dogs/new', (req, res)=>{
    const formName = req.body.name
    const formType = req.body.type

    const dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    //pushing the name and type coming from the form and saving it into the dogData variable
    dogData.push({name : formName, type: formType})

    //convert data into the json format 
    //saving the form data into the file with the destination name.
    fs.writeFileSync('./dogs.json', JSON.stringify(dogData) )

    res.render('home', {dogData} )
})
//It gives the specific name and type of the selective dogs.
app.get('/dogs/:idx', (req,res)=>{
    const dogs = fs.readFileSync('./dogs.json')
    const dogData = JSON.parse(dogs)

    //req.params.idx come form the url '/dogs/:idx' idx can be any number we can access those by req.params.idx
    const dogIndex = parseInt(req.params.idx)
    res.render('show', {dogsDa : [dogData[dogIndex]]} )
})



app.listen('4000')