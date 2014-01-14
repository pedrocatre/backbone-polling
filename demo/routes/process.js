var processesData = require('../data/processesData');

/*
 * GET process listing.
 */
exports.list = function(req, res) {
    res.send(processesData);
};