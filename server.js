var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var app = express()

app.use(morgan('dev'))
app.use('/static', express.static('public'))

app.set('views', './views')
app.set('view engine','ejs')

app.get('/', function(req, res){
  res.render('index')
})

app.listen(3000, function(err){
  if (err) console.log("could not start server")
  if (!err)console.log("Server is running on port 3000")
})
