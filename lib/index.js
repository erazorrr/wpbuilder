var utils = require('./utils');
var webpack = require('webpack');
var isArray = require('lodash.isarray');
var isObject = require('lodash.isobject');
var path = require('path');
/**
 * @param {object} params
 * @param {string} params.dirEnvironments
 * @param {string} params.pathToCoreConfig
 * @param {string} params.environment
 * @param {function} cb - callback
 */
module.exports = function (params, cb) {
  // Validation params
  var errors = [];
  if (isObject(params)) {
    if (typeof params.environment === 'undefined') errors.push('"environment" is not defined');
    if (typeof params.dirEnvironments === 'undefined') errors.push('"dirEnvironments" is not defined');
    if (typeof params.pathToCoreConfig === 'undefined') errors.push('"pathToCoreConfig" is not defined');
  } else {
    errors.push('options is undefined');
  }


  if (errors.length > 0) {
    cb(new Error(errors.join(',')));
  } else {
    // If the validation is successful
    var environment = params.environment;
    var coreConfig = require(path.resolve(params.pathToCoreConfig));
    var environmentConfig = require(path.resolve(params.dirEnvironments + '/' + environment));

    utils.getListNamesEnvironments(params.dirEnvironments, function (environments) {
      var finalyConfig = utils.mergeTwoObject(coreConfig, environmentConfig);
      var defineNamesEnv = utils.envNameToDefine(environments, environment);

      if (typeof finalyConfig.plugins === 'undefined') {
        finalyConfig.plugins = [
          new webpack.DefinePlugin(defineNamesEnv)
        ];
      } else if (isArray(finalyConfig.plugins)) {
        finalyConfig.plugins.push(new webpack.DefinePlugin(defineNamesEnv));
      }

      cb(null, finalyConfig);
    });
  }
};
