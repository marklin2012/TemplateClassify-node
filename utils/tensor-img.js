const tf = require('@tensorflow/tfjs')

function getTensorFromPixels(pixels) {
  const numChannels = 3
  const numPixels = pixels.width*pixels.height
  const values = new Uint8Array(numPixels * numChannels)
  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels.data[i * 4 + channel]
    }
  }
  return tf.tensor3d(values, [pixels.width, pixels.height, numChannels])
}

module.exports = {
  getTensorFromPixels,
  
}