var utils = require('./../../lib/utils');
var wpBuilder = require('./../../lib/index');
var webpack = require('webpack');
var path = require('path');

describe('Testing functions', function () {
  describe('::mergeConfig', function () {
    it('Should combine the two and the second config configuration must first be rewritten', function () {
      utils.mergeTwoObject(
        {
          obj: {
            arr: [1],
            prop: 'ss'
          },
          arr: [1]
        },
        {
          obj: {
            arr: [1, 2],
            prop: 'string'
          }
        }
      )
        .should.deep.equal({ obj: { arr: [1, 2, 1], prop: 'string' }, arr: [1] });
    });
  });

  describe('::envNameToDefine', function () {
    it('should return an object from the environments and their values of true or false', function () {
      utils.envNameToDefine(['production', 'development'], 'development')
        .should.deep.equal({ _PRODUCTION_: 'false', _DEVELOPMENT_: 'true' });
    });
  });

  describe('::getListNamesEnvironments', function () {
    var environments;

    before(function () {
      environments = utils.getListNamesEnvironments(path.resolve('./test/environments'));
    });

    it('should return a list of environments where there are development and production', function () {
      environments.should.be.an('promise');
      return environments.then(function (result) {
        result.should.be.an('array');
        result.should.eql(['development', 'production']);
      });
    });
  });
});

describe('WP_BUILDER', function () {
  var finalyDevConfig = null;

  before(function () {
    finalyDevConfig = wpBuilder({
      dirEnvironments: path.resolve('./test/environments'),
      pathToCoreConfig: path.resolve('./test/core_config.js'),
      environment: 'development'
    });
  });

  it('should be return promise type', function () {
    finalyDevConfig.should.be.an('promise');
  });

  it('should be return object of promise', function () {
    return finalyDevConfig.then(function (result) {
      result.should.be.an('object');
    });
  });
  it('should be return merged config with development and core', function () {
    return finalyDevConfig.then(function (result) {
      result.should.deep.equal({
        debug: true,
        cache: true,
        watch: true,
        devtool: 'eval',
        plugins: [
          new webpack.DefinePlugin({
            _DEVELOPMENT_: 'true',
            _PRODUCTION_: 'false'
          })
        ],
        entry: {
          vendors: [
            'lodash.isobject',
            'lodash.isarray'
          ]
        },
        output: {
          path: path.resolve('./public'),
          publicPath: '/'
        }
      });
    });
  });
});
