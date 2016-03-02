var _mergeWith = require('lodash.mergewith');
var _isArray = require('lodash.isarray');


/**
 *
 * @param {Object} coreConfig - core config
 * @param {Object} envConfig - env config
 * @returns {Object} - webpack config
 */
function concatConfigs (coreConfig, envConfig) {
    return _mergeWith(envConfig.webpack, coreConfig, function (objValue, srcValue) {
        if (_isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    });
}

module.exports = concatConfigs;