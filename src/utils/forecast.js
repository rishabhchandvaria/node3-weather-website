const request = require ( 'request' ) 
const chalk = require ( 'chalk' ) 

const msg = chalk . yellow 

const forecast = ( latitude , longitude , callback ) => { 
    
    const url = 'http://api.weatherstack.com/current?access_key=4ddfa9946f0a1230911df86285dbee0f&query=' + latitude + ',' + longitude + '&units=m' 
    
    request ({ url , json : true },( error ,{ body }) => { 
        
    if ( error )
    { 
        callback ( 'This is the internet issue!' , undefined ) 
    } 
    else if ( body . error )
    {
         callback ( 'This is the url issue!' , undefined ) 
    }
    else 
    {
         callback ( undefined , 'Weather Description ' + body . current . weather_descriptions [ 0 ] + '.Current temperature is ' + body . current . temperature + '.But feelslike temperature is ' + body . current . feelslike ) 
         // callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.feelslike + ' degrees.') 
    } 
}) } 

module . exports = forecast;