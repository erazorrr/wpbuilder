var path = require('path');

/**
 * @param {Array} environments - all environments
 * @param {String} envName - current environment name
 * @return {Object} - defineObjects
 */
function envNameToDefine(environments, envName) {
    var defineENV = {};

    environments.forEach(function (environment) {
        var envWithoutExt = path.basename(environment, '.js');

        defineENV['_' + envWithoutExt.toUpperCase() + '_'] = JSON.stringify(envName === envWithoutExt);
    });

    return defineENV;
}


module.exports = envNameToDefine;