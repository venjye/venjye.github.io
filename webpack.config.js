const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      async_hooks: false,
      fs: false,
      path: require.resolve('path-browserify'),
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      crypto: require.resolve('crypto-browserify'),
      events: require.resolve('events/'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      string_decoder: require.resolve('string_decoder/'),
      url: require.resolve('url/'),
      util: require.resolve('util/'),
      vm: require.resolve('vm-browserify'),
      assert: require.resolve('assert/'),
      net: require.resolve('net-browserify')
    }
  },
  module: {
    rules: [
      // 这里可以添加其他模块的规则
    ]
  }
};