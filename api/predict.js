const Joi = require('joi')
const tf = require('@tensorflow/tfjs')
const { map, slice } = require('lodash')

const getPixels = require('../utils/get-pixels')


const LEARNING_RATE = 0.001
const CLASS_NAME = ['硬朗神秘', '简约中性', '粉嫩柔美', '清新淡雅', '喜庆活泼', '绚丽强烈', '未来科技', '炫酷新潮']

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
  // validate: {
  //   query: {
  //     imgUrl: Joi.string()
  //       // .required()
  //       .description('图片链接地址')
  //   }
  // },
  handler: async (ctx, next) => {
    console.log('predict api')
    const { imgUrl } = ctx.request.query

    const model = await tf.loadModel('file://tf_model/model.json')
    const optimizer = tf.train.adam(LEARNING_RATE)
    model.compile({ optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']})

    const res = await getPixels(imgUrl)
    console.log('res:', res)

    const img = tf.image.resizeNearestNeighbor(res, [32, 32])
    console.log('img: ', img)
    const img2 = img.reshape([1, 32, 32, 3])
    console.log('img2: ', img2)
    // const result = tf.tensor4d(img2)
    // console.log('res: ', result)
    const predict = await model.predict(img2).data()
    console.log('label:', predict.toString())
    console.log('xxxxxx:', predict)
    ctx.body = getResultFromPredict(predict)
  }
}