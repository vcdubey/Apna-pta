var _ = require('lodash')
var path = require('path')
// var helpers = require('../helpers')
// var querystring = require('querystring')
// var Listing = require('../models/listing')
// var h = require('../helpers/app_helper')
// var config = require('../../config/config')

function readBase (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'index.html'))
  }

  module.exports = {
    readBase: readBase
  }