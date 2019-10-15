var listings = require('../controllers/apicontroller')
var map = require('../controllers/mapapicontroller')
// var parties = require('../controllers/parties_controller')
// var cm = require('../controllers/cm_controller')

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.get('/', listings.readBase)
  app.get('/mapmyindia',map.getData)
  app.get('/nearby',map.nearBy)
}