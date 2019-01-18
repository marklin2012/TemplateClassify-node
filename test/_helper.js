const request = require('supertest')
const app = require('../lib/app')
const http = require('http')

function makeApp () {
  return http.createServer(app.callback())
}

function agent () {
  return request.agent(makeApp())
}

module.exports = {
  agent,
}
