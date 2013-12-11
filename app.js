
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var processes = require('./routes/process');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Generate dummy process data
// This should not be here but I'm only using nodejs as a server for the example.

processesData = [];

var maxNumberOrProcesses = 10;
var countToCreateNew = 0;

var updateExistingProcesses = function() {
    for(var i=0; i< processesData.length; i++) {
        processesData[i].numberOfProcessedFiles++;
        processesData[i].percentageComplete += Math.floor((Math.random()*4)+1);
        processesData[i].percentageComplete = (processesData[i].percentageComplete > 100) ? 100: processesData[i].percentageComplete;
    }
}

var sampleTypesOfProcess = ['Testing', 'Refactoring', 'Implementing', 'Compressing', 'Hammering', 'Forking']

var createNewProcess = function() {
    return {
        'typeOfProcess': 'Executing',
        'percentageComplete': Math.floor((Math.random() * 20) + 1),
        'state': 'executing',
        'numberOfProcessedFiles': Math.floor((Math.random() * 5) + 1),
        'title': 'process ' + Math.floor((Math.random() * 10000) + 1),
        'type': sampleTypesOfProcess[Math.floor((Math.random() * sampleTypesOfProcess.length))]
    }
}

var refreshRate = 500;

var startGeneratingData = function(length) {
    var self = this;
    this.timeout = setTimeout(function() {

        // Update existing processes
        updateExistingProcesses();

        // Create new process
        if(countToCreateNew++ > 10) {
            processesData.push(createNewProcess());
            countToCreateNew = 0;
        }

        // Remove excess processes
        if(processesData.length > maxNumberOrProcesses) {
            processesData = processesData.slice(maxNumberOrProcesses/2, maxNumberOrProcesses);
        }

        startGeneratingData(refreshRate);
    }, length );

};

startGeneratingData(0);

app.get('/', routes.index);
app.get('/processes', processes.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
