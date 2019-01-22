/**
 * Start web application
 */
const app = require('./lib/app')
const config = require('./lib/config')
require('@tensorflow/tfjs-node');

app.listen(config.port, function () {
  console.log('\n----------------------------')
  console.log('Node app is running!')
  console.log('\tENV: \t%s', config.env)
  console.log('\tPORT: \t%s', config.port)
  console.log('\tPORTAL PREFIX: \t%s', config.portalPrefix)
  console.log('\tNODE VERSION: \t%s', process.version)
  console.log('\tSTARTUP TIME: \t%s', new Date())
  console.log('----------------------------\n')
})
