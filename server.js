var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var app = express()
var request=require('request')
var jsonParse=bodyParser.json()
require('dotenv').config()

app.use(morgan('dev'))
app.use('/static', express.static('public'))
app.use(jsonParse)

app.set('views', './views')
app.set('view engine','ejs')

app.get('/', function(req, res){
  res.render('index')
})

app.post('/weather', function(req, res){
  let body=''
  req.on('data', function(chunk) {
    console.log("Received body data:")
    console.log(chunk.toString())
    body += chunk.toString()
  })

  req.on('end',()=>{
    var latNum=body.split(/[:,{}\s]/)[3]
    var lonNum=body.split(/[:,{}\s]/)[7]

    console.log("Making request to Weather API")

    request(`http://api.openweathermap.org/data/2.5/weather?lat=${latNum}&lon=${lonNum}&appid=${process.env.WEATHER_KEY}`, (error, response, body)=>{
      if (!error && response.statusCode==200){
        var parseBody=JSON.parse(body)
        var currentWeather=parseBody["weather"][0]["main"]
        res.send(currentWeather)
      }
    })
  })

})

app.listen(process.env.PORT || 3000, function(err){
  if (err) console.log("could not start server")
  if (!err)console.log("Server is running on port 3000")
})
