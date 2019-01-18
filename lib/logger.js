const cluster = require('cluster')
const config = require('./config')

const Logger = require('pino')({
  level: config.logLevel,
  timestamp: true,
  extreme: !config.isDev,
  prettyPrint: config.isDev,
})

process.on('uncaughtException', err => {
  try {
    console.error(err)
    Logger.flush()
    if (cluster.isWorker) {
      cluster.worker.disconnect()
    }
    setTimeout(function () {
      process.exit(1)
    }, 3000)
  } catch (err) {
    process.exit(1)
  }
})

module.exports = Logger
