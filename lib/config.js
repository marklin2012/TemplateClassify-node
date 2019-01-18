const path = require('path')
const { merge } = require('lodash')

const env = process.env.NODE_ENV || 'development'

const config = merge({
  isDev: env === 'development',
  env,
  root: path.resolve(__dirname, '../'),
}, require('config'), {
  port: process.env.PORT,
})

// 确保 domain 字段最后没有斜杠
if (/\/$/.test(config.domain)) {
  config.domain = config.domain.slice(0, -1)
}

module.exports = config
