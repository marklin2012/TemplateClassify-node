/* eslint-disable no-ex-assign */
const { isError, isString, isNumber } = require('lodash')
const Logger = require('../lib/logger')
const config = require('../lib/config')
const isTest = config.env === 'test'

async function handleError (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (!isError(err)) {
      if (isString(err)) {
        err = new Error(err)
      } else if (isNumber(err)) {
        err = new Error(`error ${err}`)
      } else {
        err = new Error('unknown error')
      }
    }
    ctx.status = err.status || 500
    ctx.body = {
      statusCode: ctx.status,
      message: err.message || 'Unknown Error',
    }

    // 本地开发报错的话，显示错误堆栈信息
    if ((config.isDev || isTest) && ctx.status >= 500) {
      Logger.debug(err.stack)
    }

    ctx._errObj = err
    ctx.set('Cache-Control', 'no-cache')
  }
}

module.exports = handleError
