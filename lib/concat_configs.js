var _merge = require('lodash.merge');
var _isArray = require('lodash.isarray');


/**
 *
 * @param {Object} coreConfig - core config
 * @param {Object} envConfig - env config
 * @returns {Object} - webpack config
 */
function concatConfigs (coreConfig, envConfig) {
    return _merge(coreConfig, envConfig.webpack);
}

module.exports = concatConfigs;