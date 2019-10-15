var path = require('path');
var request = require('request-promise');
var helpers = require('../helpers');
const btoa = require('btoa');
var config = require('../config/env/'+process.env.NODE_ENV);

const client_id = config.oauth.client_id;
const client_secret = config.oauth.client_secret;
const access_token_url = config.oauth.access_token_url
const apiKey = config.apiKey
const mapBaseURL = config.mapBaseURL
const nearByBaseURL = config.nearByBaseURL

function getAddress (req, res, next) {
  var url = mapBaseURL+apiKey+"/rev_geocode?lat="+req.query.lat+"&lng="+req.query.lng;
  helpers.getContent(url,true)
  .then(function(data){
      return res.status(200).json(data);
  }).catch(function (err) {
    console.log(err);
    return res.status(500).send({ errorMessage: 'Internal server error.', statusCode: 500 });
  })
}

async function nearBy(req, res, next) {
  const token = await generateToken();
  var response = await getNearByLocation1(token, req);
 // console.log("response", response)
  return res.status(200).json(response);;
}

async function generateToken() {
  console.log("test")
  const token = btoa(client_id + ":" + client_secret)
  try {
    const { token_type, access_token } = await request({
      uri: access_token_url,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        grant_type: 'client_credentials'
      },
    })
    console.log(token_type + access_token);
    return (token_type + " " + access_token)

  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

async function getNearByLocation(token, req) {
  try {
    var response = await request({
      uri: nearByBaseURL+"refLocation="+req.query.lat+","+req.query.lng+"&keywords=school;coffee;hospital;atm&dist:asc&pageSize=100",
      json: true,
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
    //console.log(response);
    getNearByLocation1(token, req);
    return response

  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}


async function getNearByLocation1(token, req) {
  var nearbyList = {
    atm: "atm",
    school: "school",
    hospital: "hospital",
    police: "police",
    toilet: "toilet",
    railway: "railway"
  };

  var url = nearByBaseURL+"refLocation="+req.query.lat+","+req.query.lng+"&dist:asc&keywords=";
  responses  = await getC(token, req, url,nearbyList);

  return responses;
  
}

async function getC(token, req,url,nearbyList) {
  var responses = [];
  var p ={};
  for(key in nearbyList){
    console.log(key+ "KKKK");
    try {
      p[key] = await request({
        uri: url + nearbyList[key],
        json: true,
        method: 'GET',
        headers: {
          authorization: token,
        },
      })

      //responses.push(r);

     // console.log(responses);
     // return response
  
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  console.log("Vivek")

  console.log(p);

  return p;
}









module.exports = {
    getData: getAddress,
    nearBy: nearBy
}
