process.env.NODE_ENV = process.env.NODE_ENV || 'test'
console.log("===>", process.env.NODE_ENV);
const request = require('request-promise')
const btoa = require('btoa')
var config = require('./config/env/'+process.env.NODE_ENV)

console.log("env",process.env.NODE_ENV)
console.log("config",config);
const { ISSUER, TEST_CLIENT_ID, TEST_CLIENT_SECRET, DEFAULT_SCOPE } = process.env

const test = async () => {
  console.log("test")
  const token = btoa(`SE7boj90l1c7VZl_vYsdgAJ_StI5qT21elCBREBtb5EepqkRKHq5uMFPTS19rVbTJi5BC0t6I5xmGuHsup3dvrlAMu6IoaSq:PrmntVCPnA0kA75vXZBj4jZDykafOIQ96CloJnB7EtLZCWJFgdtOecZfhkrzZkVSjjJtphIwsL3_MIyKnJ6_60vkWlE8E0ixGvEURIyrDLE=`)
  try {
    const { token_type, access_token } = await request({
      uri: `https://outpost.mapmyindia.com/api/security/oauth/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        grant_type: 'client_credentials',
        scope: DEFAULT_SCOPE,
      },
    })

    console.log(token_type, access_token)
    
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

//test()

const test1 = async () => {
  console.log("test1")
  const token = btoa(`SE7boj90l1c7VZl_vYsdgAJ_StI5qT21elCBREBtb5EepqkRKHq5uMFPTS19rVbTJi5BC0t6I5xmGuHsup3dvrlAMu6IoaSq:PrmntVCPnA0kA75vXZBj4jZDykafOIQ96CloJnB7EtLZCWJFgdtOecZfhkrzZkVSjjJtphIwsL3_MIyKnJ6_60vkWlE8E0ixGvEURIyrDLE=`)
  try {
    const { token_type, access_token } = await request({
      uri: `https://outpost.mapmyindia.com/api/security/oauth/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        grant_type: 'client_credentials',
        scope: DEFAULT_SCOPE,
      },
    })

    console.log(token_type + access_token)
    
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}
//test1()

a = async ()=> {
  await test()
  test1()
}
a()

