const express = require('express')
const ejsLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
//fs is a built in module
const fs = require('fs')
const app = express()
app.set('view engine', 'ejs')
//middleware
app.use(ejsLayout)
app.use(methodOverride('_method'))
//Whenever we are sending the some kind of data to the url link, it need to be parse i.e. body.parse this middleware help us to do that in more significant way.
app.use(express.urlencoded({extended: true}))

//It search the dogs in the list, this has to be in top than home route.
app.get('/dogs', (req, res)=>{
    let filterData = req.query.nameFilter
    const dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    

    if(filterData){
        dogData = dogData.filter((dogDa)=>{
           return filterData.toLowerCase() === dogDa.name.toLowerCase()
        })
        
    }
    res.render('home',{myDog: dogData})
})
//It is a homepage
app.get('/dogs',(req, res)=>{
    const dogs = fs.readFileSync('./dogs.json')
    //since the data is in json format we need to parse it to display into readable format.
    const dogData = JSON.parse(dogs)
    res.render('home', {myDog : dogData})
})
//It renders the form for creating new name and type of the dogs.
app.get('/dogs/new',(req,res)=>{
    res.render('new')
})
//It creates the new data.
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

    res.redirect("/dogs" )
})

//It gives the specific name and type of the selective dogs.
app.get('/dogs/:idx', (req,res)=>{
    const dogs = fs.readFileSync('./dogs.json')
    const dogData = JSON.parse(dogs)

    //req.params.idx come form the url '/dogs/:idx' idx can be any number we can access those by req.params.idx
    const dogIndex = parseInt(req.params.idx)
    res.render('show', {dogsDa : [dogData[dogIndex]]} )
})

app.delete('/dogs/:idx',(req, res)=>{
    const dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)

    //delete the required element with the splice method.
    dogData.splice(req.params.idx, 1)

    //write the updated list in the json fromat.
    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
    
    //now redirecting it into the home page after the comletion of the delete function
    res.redirect('/dogs')

})
//This is the route to show the edit form part, when the click the edit button it send the index of that dog to be edited
app.get('/dogs/edit/:idx',(req, res)=>{
    const dogs = fs.readFileSync('./dogs.json')
    const dogData = JSON.parse(dogs)

    //we need to send the data of the specific dog by 'dogData[req.params.idx]'
    res.render('edit.ejs', {myDog: dogData[req.params.idx], dogIndex: req.params.idx })
})

//This is the route to actually edit the content i.e. name and type
app.put('/dogs/:idx',(req,res)=>{
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    //it helps to save the name coming from the form into the dogs i.e. json.file
    dogs[req.params.idx].name = req.body.name 
    dogs[req.params.idx].type = req.body.type 

    //saving the data
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    //redirect into the home page
    res.redirect('/dogs')

})

app.listen('4000')