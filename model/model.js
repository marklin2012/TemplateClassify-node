const tf = require('@tensorflow/tfjs')

const LEARNING_RATE = 0.001

const model = tf.sequential()

// 第1层卷积网络
model.add(tf.layers.conv2d({
  inputShape: [32, 32, 3],
  filters: 32,
  kernelSize: 3,
  activation: 'relu',
}))
// 最大池化
model.add(tf.layers.maxPooling2d({
  poolSize: [2, 2]
}))
// 第2层卷积网络
model.add(tf.layers.conv2d({
  filters: 32,
  kernelSize: 3,
  activation: 'relu',
}))
// 最大池化
model.add(tf.layers.maxPooling2d({
  poolSize: [2, 2]
}))
// 拉成1维数组
model.add(tf.layers.flatten())
// 随机失活
model.add(tf.layers.dropout({rate: 0.35}))
// 全连接层
model.add(tf.layers.dense({ units: 128, activation: 'relu'}))
// 随机失活
model.add(tf.layers.dropout({rate: 0.5}))
// 全连接层2
model.add(tf.layers.dense({units: 8, activation: 'softmax'}))

const optimizer = tf.train.adam(LEARNING_RATE)

model.compile({optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']})

module.exports = model

