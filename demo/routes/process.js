
/*
 * GET process listing.
 */

exports.list = function(req, res){
    res.send(processesData);
};