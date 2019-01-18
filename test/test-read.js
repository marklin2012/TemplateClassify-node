const assert = require('power-assert')
const _ = require('lodash')
const { agent } = require('./_helper')

describe('/', () => {

  describe('GET /', () => {
    it('成功解析 JPG 图片', async () => {
      const res = await agent()
        .get('/?img=http://img11.360buyimg.com/ling/jfs/t1/30586/25/654/235306/5c3e9820E6143fcfa/5cc708e0a757df2e.jpg')
        .expect(200)

      console.log(res.body)
      assert(_.isArray(res.body))
      assert(_.map(res.body, 'name').includes('owner'))
    })

    it('成功解析 PNG 图片', async () => {
      const res = await agent()
        .get('/?img=http://img14.360buyimg.com/ling/jfs/t1/29004/23/5456/88055/5c3ee048Ea3bc585c/76a1400b31529a8b.png')
        .expect(200)

      console.log(res.body)
      assert(_.isArray(res.body))
      assert(_.map(res.body, 'name').includes('owner'))
    })
  })
})