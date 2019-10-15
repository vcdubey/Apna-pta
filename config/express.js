var express = require('express')
// var app = express()
var bodyParser = require('body-parser')

module.exports = function () {
  var app = express()

  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use(bodyParser.json())

  require('../routes/routes.js')(app)

  app.use(express.static('./public'))

  return app
}