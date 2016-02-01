var BPromise = require('bluebird');
var fs = require('fs');

/**
 * @param {string} envDir The name of the folder where are the environment
 * @return {Promise<Array>} Return names environments
 */
function getAllEnvironments(envDir) {
    return new BPromise(function (resolve, reject) {
        fs.readdir(envDir, function (err, environments) {
            if (err) reject(err);

            resolve(environments);
        });
    });
}



module.exports = getAllEnvironments;