const request = require('request')

function getPixels (src) {
  return new Promise((resolve, reject) => {
    request.get(src, { timeout: 5000, encoding: null }, (err, resp) => {
      if (err) return reject(err)
      if (!resp || !resp.body) return reject(new Error('获取不到图片数据'))
      resolve(resp.body)
    })
  })
}

module.exports = getPixels
