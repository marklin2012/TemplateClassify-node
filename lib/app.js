const Koa = require('koa')

const app = new Koa()
const router = require('./router')

// Trust proxy header fields
// app.proxy = true

// app.use((ctx, next) => {
//   if (ctx.url === '/favicon.ico') {
//     ctx.status = 200
//     return
//   }
//   return next()
// })

// Access Log
app.use(require('../middleware/access-log'))

// Error Handler
app.use(require('../middleware/error'))

// Routers
app.use(router.middleware())

module.exports = app
