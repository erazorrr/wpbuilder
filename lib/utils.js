var fs = require('fs');
var lodashMergeWidth = require('lodash.mergewith');
var lodashIsArray = require('lodash.isarray');
var lodashIsObject = require('lodash.isobject');


/**
 * Function return config from .wpbuilderrc or empty config
 * @param cb - callback
 */
exports.readWpBuilderRc = function (cb) {
  var pathToConfig = process.cwd() + '/.wpbuilderrc';
  fs.exists(pathToConfig, function (exists) {
    if (exists) {
      fs.readFile(pathToConfig, 'utf8', function (err, content) {
        if (err) throw err;
        else cb(JSON.parse(content));
      });
    } else {
      cb({});
    }
  });
};


/**
 * Get list names environments.
 * @param {string} envDir - name of the folder where all the surroundings are.
 * @param {function} cb - callback
 */
exports.getListNamesEnvironments = function (envDir, cb) {
  fs.readdir(envDir, function (err, environments) {
    if (err) throw err;
    cb(environments.map(function (env) {
      return env.slice(0, env.length - 3);
    }));
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
