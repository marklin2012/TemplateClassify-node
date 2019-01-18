const Joi = require('joi')

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
  handle: async (ctx, next) => {
    console.log('predict api')
    const { imgUrl } = ctx.request.query
    ctx.body = imgUrl
  }
}