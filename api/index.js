const Router = require('koa-joi-router')
const router = Router()

const predictApi = require('./predict')
router.get('/predict', predictApi.predict)

module.exports = router
