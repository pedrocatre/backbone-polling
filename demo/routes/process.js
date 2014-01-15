var processesData = require('../data/processesData');
var _ = require('underscore');
/*
 * GET process listing.
 */
exports.list = function(req, res) {
    var searchTerm = req.param('searchTerm'),
        orderBy = req.param('orderBy'),
        orderedProcessData,
        filteredProcessesData;
    console.log('order by: ' + orderBy)
    if(_.isUndefined(orderBy)) { orderBy = 'title'; }

    orderedProcessData = _.sortBy(processesData, function(process){
        return process[orderBy];
    });

    if(!(_.isUndefined(searchTerm)) && searchTerm !== '') {
        // Filter the data using the search term
        filteredProcessesData = _.filter(orderedProcessData, function(process) {
            return _.some(process, function(value) {
                // convert the value to string
                // if the value contains the searchTerm return true
                return ('' + value).indexOf(searchTerm) !== -1;
            });
        });
        res.send(filteredProcessesData);
    } else {
        res.send(orderedProcessData);
    }
};

/**
 * Get process item
 * @param req
 * @param res
 */
exports.item = function(req, res) {
    var processId = req.params.id,
        process;

    process = _.findWhere(processesData, {id: processId});

    if(_.isUndefined(process)) {
        res.status(404).send('Not found');
    }

    res.send(process);
}