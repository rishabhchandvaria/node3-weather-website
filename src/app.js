const express = require('express')
const path = require('path')
const hbs= require('hbs')

const port = process.env.PORT || 3000

const geocode = require ( './utils/geoCode.js' ) 
const forecast = require ( './utils/forecast.js' ) 

console.log(__dirname)
console.log(__filename)

const app =express()

//Define Paths for express config
const pathToIndex = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views/')
const partialPaths = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPaths)

//Setup Static directory to serve
app.use(express.static(pathToIndex))


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name :'Rishabh Singh Chandvaria'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rishabh Singh Chandvaria'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        description :'For any  kind of help please contact to our team .Contact number are mentioned below.',
        contact : '+91 9873368828',
        name :'Rishabh Singh Chandvaria'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({error: 'Please provide address'})
    }

    geocode ( req.query.address ,( error ,{ longitude , latitude , location }={}) => { 
        if ( error ) 
        { 
            return res.send({error})
        } 
        forecast ( longitude , latitude ,( error , forecastData ) => { 
            if ( error ) 
            { 
                return res.send({error})
            } 
            
            res.send({
                forecast:forecastData,
                location,
                address  : req.query.address
            })
        }) 
    }) 
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title :'404 Error page',
        name:'Rishabh Singh Chandvaria',
        errormsg : 'Help Page Not Found!!!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title :'404 Error page',
        name:'Rishabh Singh Chandvaria',
        errormsg : 'Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?'
    })
})

app.listen(port,(req,res)=>{
    console.log('We are on port ' + port)
})


// app.get('/about',(req,res)=>{
//     res.send('<H1>We are displaying ABOUT using html.</H1>')
// })

// app.get('/help',(req,res)=>{
// res.send(
//          [{name :'Rishabh Singh Chandvaria',age:28},
//          {name : 'Apurv Singh Chandvaria' , age:31}]
// )
// })