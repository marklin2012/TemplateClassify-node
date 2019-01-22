const Router = require('koa-joi-router')
const apiRouter = require('../api')
const config = require('./config')

const router = Router()

// router.get('/', async ctx => {
//   ctx.body = 'hello joi-router'
// })


router.use('/api', apiRouter)
module.exports = router