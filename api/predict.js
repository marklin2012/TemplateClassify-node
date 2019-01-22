const Joi = require('joi')
const tf = require('@tensorflow/tfjs')
const { map, slice } = require('lodash')

const getPixels = require('../utils/get-pixels')
const { getTensorFromPixels } = require('../utils/tensor-img')
const { CLASS_NAME, LEARNING_RATE } = require('../lib/constant')

function getResultFromPredict (predict) {
  const result = map(predict, (p, i) => {
    return {
      probability: p,
      className: CLASS_NAME[i],
    }
  }).sort((a, b) => {
    return b.probability - a.probability
  })
  return slice(result, 0, 3)
}

exports.predict = {
  meta: {
    swagger: {
      summary: '预测图片',
      tags: ['predict'],
    }
  },
  validate: {
    query: {
      imgUrl: Joi.string()
        .required()
        .description('图片链接地址')
    }
  },
  handler: async (ctx, next) => {
    const { imgUrl } = ctx.request.query

    // 读取模型
    const model = await tf.loadModel('file://tf_model/model.json')
    const optimizer = tf.train.adam(LEARNING_RATE)
    model.compile({ optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']})
    
    // 预测图片
    const pixels = await getPixels(imgUrl)
    const imgTensor = getTensorFromPixels(pixels)
    const normalizedImg = tf.image.resizeNearestNeighbor(imgTensor, [32, 32]).reshape([1, 32, 32, 3])
    const predict = await model.predict(normalizedImg).data()

    ctx.body = getResultFromPredict(predict)
  }
}