module.exports = {
  debug: true,
  cache: true,
  watch: true,
  devtool: 'eval',
  entry: {
    vendors: [
      'lodash.isobject'
    ]
  },
  output: {
    publicPath: '/'
  }
};
