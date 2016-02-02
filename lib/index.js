var getConfigEnv = require('./get_config_env.js');
var getAllEnvironments = require('./get_all_env.js');
var envNameToDefine = require('./env_name_to_define.js');
var concatConfigs = require('./concat_configs.js');
var webpack = require('webpack');
var _merge = require('lodash.merge');

var configPath = process.cwd() + '/config',
    envPath = configPath + '/environments',
    coreConfig = require(configPath + '/boot.js');



function wpBuild(environments, envName) {
    var envFile = getConfigEnv(environments.map(function (env) {
        return envPath + '/' + env;
    }), envName);
    var defineEnv = envNameToDefine(environments, envName);
    var concated_config = concatConfigs(coreConfig, envFile);

    concated_config.plugins.push(new webpack.DefinePlugin(_merge(defineEnv, {
        APPLICATION: JSON.stringify(envFile.application || {})
    })));

    return concated_config;
}

module.exports = function (envName, cb) {
    return getAllEnvironments(envPath, function (environments) {
        cb(wpBuild(environments, envName));
    });
};