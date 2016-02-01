var path = require('path');


/**
 * @param {Array} environments - all environments
 * @param {String} envName - name current environment
 * @return {Promise<Object>} Return environment file
 */
function getConfigEnv(environments, envName) {
    for (var i = environments.length - 1; i >= 0; i--) {
        if (path.basename(environments[i], '.js') === envName) {
            return require(environments[i]);
        }
    }

    throw new Error('Environment config not found');
}

module.exports = getConfigEnv;