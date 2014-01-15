var processesData = require('../data/processesData');
var _ = require('underscore');
/*
 * GET process listing.
 */
exports.list = function(req, res) {
    var searchTerm = req.param('searchTerm'),
        filteredProcessesData;
    if(!(_.isUndefined(searchTerm))) {
        // Filter the data using the search term
        filteredProcessesData = _.filter(processesData, function(process) {
            return _.some(process, function(value) {
                // convert the value to string
                // if the value contains the searchTerm return true
                return ('' + value).indexOf(searchTerm) !== -1;
            });
        });
        res.send(filteredProcessesData);
    } else {
        res.send(processesData);
    }
};