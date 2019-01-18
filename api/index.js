// const { readMeta } = require('@o2team/images-meta')
const getPixels = require('../utils/get-pixels')
const config = require('../lib/config')
const getImgSrc = require('../utils/get-img-src')

const Router = require('koa-joi-router')
const router = Router()

// const trainApi = require('./train')
// router.get('/train', trainApi.train)

const predictApi = require('./predict')
router.get('/predict', predictApi.predict)

async function main (ctx) {
  ctx.body = "hello koa"
  // if (!ctx.querystring) {
  //   ctx.status = 200
  //   return
  // }
  // let query = ctx.query
  // let imgUrl = query.img
  // if (!imgUrl) {
  //   return ctx.throw('缺少图片地址参数 img')
  // }
  // let mineType = imgUrl.endsWith('.jpg') ? 'image/jpeg' : 'image/png'

  // if (!config.isDev) {
  //   imgUrl = imgUrl.replace('360buyimg.com', '360buyimg.local')
  // }

  // if (!imgUrl.startsWith('http')) {
  //   imgUrl = getImgSrc(imgUrl)
  // }

  // let pixels = await getPixels(imgUrl)
  // ctx.body = await readMeta(pixels, mineType)
}

module.exports = router
