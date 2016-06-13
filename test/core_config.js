var path = require('path');
/**
 * This is example config. It is close to real life, but it does not match
 */
module.exports = {
  entry: {
    vendors: [
      'lodash.isarray'
    ]
  },
  output: {
    path: path.resolve('./public'),
    publicPath: '/s'
  }
};
