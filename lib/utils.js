var fs = require('fs');
var lodashMergeWidth = require('lodash.mergewith');
var lodashIsArray = require('lodash.isarray');
var lodashIsObject = require('lodash.isobject');


/**
 * Function return config from .wpbuilderrc or empty config
 * @returns {Promise}
 */
exports.readWpBuilderRc = function () {
  return new Promise(function (resolve, reject) {
    var pathToConfig = process.cwd() + '/.wpbuilderrc';
    fs.exists(pathToConfig, function (exists) {
      if (exists) {
        fs.readFile(pathToConfig, 'utf8', function (err, content) {
          if (err) reject(err);
          else resolve(JSON.parse(content));
        });
      } else {
        resolve({});
      }
    });
  });
};


/**
 * Get list names environments.
 * @param envDir - name of the folder where all the surroundings are.
 */
exports.getListNamesEnvironments = function (envDir) {
  return new Promise(function (resolve, reject) {
    fs.readdir(envDir, function (err, environments) {
      if (err) reject(err);
      resolve(environments.map(function (env) { return env.slice(0, env.length - 3); }));
    });
  });
};


/**
 * It combines two config. The core configuration and configuration environment
 * @param {Object} core - core config
 * @param {Object} env - config environment
 * @return {Object} merged two object with array
 */
exports.mergeTwoObject = function (core, env) {
  return lodashMergeWidth(env, core, function (objValue, srcValue) {
    if (lodashIsArray(objValue)) return srcValue.concat(objValue);
    else if (lodashIsObject(objValue) && lodashIsObject(srcValue)) return exports.mergeTwoObject(objValue, srcValue);
    return srcValue;
  });
};


/**
 *
 * @param {Array.<string>} listNames - list names environments
 * @param {string} name - name current environment
 * @return {Object} object of name environments
 */
exports.envNameToDefine = function (listNames, name) {
  var define = {};

  listNames.forEach(function (nameEnv) {
    define['_' + nameEnv.toUpperCase() + '_'] = JSON.stringify(nameEnv === name);
  });

  return define;
};
