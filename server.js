process.env.NODE_ENV = process.env.NODE_ENV || 'test'

// var config = require('./config/config')
var express = require('./config/express')
var app = express()

app.listen(6565, function () {
  // console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  console.log(process.env.NODE_ENV + ' server running at http://localhost:' + 6565)
})
