var h = require('./helpers/app_helper')
var request = require('request')
var Promise = require('promise')

function extractData (json, propertyPath) {
  return h.getNestedProperty(json, propertyPath)
}

function getContent (url, json) {
  return new Promise(function (resolve, reject) {
    json = json || false
    request({url: url, json: json}, function (err, res, body) {
      if (err) {
        reject(err)
      } else {
        if (res.statusCode < 200 || res.statusCode > 299) {
          var error = new Error()
          error.message = 'Failed to load page'
          error.statusCode = res.statusCode
          error.body = res.body
          reject(error)
        }
        resolve(body)
      }
    })
  })
}

module.exports = {
  extractData: extractData,
  getContent: getContent
}
