var processData = require('../data/processData');

/*
 * GET process item.
 */

exports.item = function(req, res){
    res.send(processData);
};