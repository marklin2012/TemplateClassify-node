const Logger = require('../lib/logger')
const config = require('../lib/config')

const slowTime = 10000 // 10 秒

async function devAccessLogMiddleware (ctx, next) {
  const startTime = Date.now()
  await next()

  const length = ctx.length > 1000000
    ? (ctx.length / 1000000).toFixed(2) + 'MB'
    : ((ctx.length || 0) / 1000).toFixed(2) + 'KB'

  const respTime = ((Date.now() - startTime) / 1000).toFixed(2) + 's'

  const status = ctx.status
  const logType = status >= 500
    ? 'error'
    : status >= 400
      ? 'warn' : 'info'

  if ((Date.now() - startTime) > slowTime) {
    Logger.warn('⚠️ 警告！该接口速度太慢啦！')
  }

  Logger[logType](`
[${ctx.method}]\t${decodeURI(ctx.url)}
[${status}]\t${respTime}\t${length}
`)
}

async function accessLogMiddleware (ctx, next) {
  const startTime = Date.now()
  return next().finally(() => {
    const status = ctx.status
    const respTime = Date.now() - startTime
    let fn, err
    if (status >= 500) {
      fn = 'error'
      err = ctx._errObj.message
    } else if (respTime > slowTime) {
      fn = 'warn'
      err = 'slow'
    } else if (
      status >= 400 &&
      status !== 422 &&
      status !== 409 &&
      status !== 404 &&
      status !== 403 &&
      status !== 401
    ) {
      fn = 'warn'
    } else {
      fn = 'info'
    }

    Logger[fn](
      {
        status,
        respTime,
        length: ctx.length,
        method: ctx.method,
        url: ctx.url,
        ip: ctx.ip,
        err,
      }
    )
  })
}

module.exports = config.isDev ? devAccessLogMiddleware : accessLogMiddleware
