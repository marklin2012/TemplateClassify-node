const Router = require('koa-joi-router')
const apiRouter = require('../api')
const config = require('./config')

const router = Router()

router.use('/api', apiRouter)

module.exports = router