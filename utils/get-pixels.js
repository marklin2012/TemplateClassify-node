const request = require('request')
const PNG = require('pngjs').PNG
const JPEG = require('jpeg-js')
const fs = require('fs')
const { endsWith,  } = require('lodash')

function handlePNG (stream, cb) {
  stream
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on('parsed', function () {
      cb(null, {
        data: this.data, // Buffer<Uint8Array>
        width: this.width,
        height: this.height,
      }) 
    })
    .on('error', err => cb(err))
}

function handleJPG (stream, cb) {
  stream.setEncoding('binary')
  let chunks = []

  stream
    .on('data', chunk => {
      chunks.push(Buffer.from(chunk, 'binary'))
    })
    .on('end', () => {
      let binary = Buffer.concat(chunks)
      let jpeg = JPEG.decode(binary, true) // width, height, data: Uint8Array

      cb(null, {
        data: jpeg.data,
        width: jpeg.width,
        height: jpeg.height,
      })
    })
}

let handleFunc = {
  jpg: handleJPG,
  jpeg: handleJPG,
  png: handlePNG,
}

/**
 * 解析图片元数据  
 * 
 * @param {string} src 图片地址
 * 
 * @returns {Promise<object>} 图片元数据 { data: 图片 RGBA 元数据, width, heigh}
 */
function getPixels (src) {
  if (typeof src !== 'string') {
    throw new Error('src must be a string, but got: ', src)
  }
  let path = src
  // 如果是 webp 的图片，则去掉 webp 后缀
  if (endsWith(path, '.webp')) {
    path = path.substr(0, path.lastIndexOf('.'))
  }
  let match = path.match(/\.([^.]+?)$/)
  let ext = (match && match[1] || '').toLowerCase()
  if (!handleFunc[ext]) {
    throw new Error('unknown extension type: ', src)
  }

  return new Promise((resolve, reject) => {
    let stream
    if (/^https?:/i.test(path)) {
      stream = request.get(path, { timeout: 5000 }).on('response', onResponse)
    } else {
      stream = fs.createReadStream(path)
      func(stream)
    }

    stream.on('error', reject)
    
    function onResponse (resp) {
      if (!resp) return reject(new Error('请求不成功'))

      if (resp.statusCode !== 200) {
        reject(new Error('图片加载状态码异常：' + resp.statusCode))
      } else {
        func(resp)
      }
    }

    function func (stream) {
      handleFunc[ext](stream, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    }
  })
}

module.exports = getPixels
