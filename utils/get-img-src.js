const { isDev } = require('../lib/config')
const { hashStr } = require('./hash')

const ids = [10, 11, 12, 13, 14, 20, 30]

const JFS_IMG_PREFIX = isDev
  ? '.360buyimg.com/ling/'
  : '.360buyimg.local/ling/'

function getImgSrc (jfs_url) {
  return 'http://img' + ids[hashStr(jfs_url) % 7] + JFS_IMG_PREFIX + jfs_url
}

module.exports = getImgSrc
