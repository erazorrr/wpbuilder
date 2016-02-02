var fs = require('fs');

/**
 * @param {string} envDir The name of the folder where are the environment
 * @param {Function} cb - callback
 * @return {undefined}
 */
function getAllEnvironments(envDir, cb) {
    fs.readdir(envDir, function (err, environments) {
        if (err) throw err;
        cb(environments);
    });
}


module.exports = getAllEnvironments;