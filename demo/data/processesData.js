// Generate dummy process data

var processesData = [];

var maxNumberOrProcesses = 10;
var countToCreateNew = 0;

var updateExistingProcesses = function() {
    for(var i=0; i< processesData.length; i++) {
        processesData[i].numberOfProcessedFiles++;
        processesData[i].percentageComplete += Math.floor((Math.random()*4)+1);
        processesData[i].percentageComplete =
            (processesData[i].percentageComplete > 100) ? 100: processesData[i].percentageComplete;
    }
}

var sampleTypesOfProcess = ['Testing', 'Refactoring', 'Implementing', 'Compressing', 'Hammering', 'Forking'];

var createNewProcess = function() {
    return {
        'typeOfProcess': 'Executing',
        'percentageComplete': Math.floor((Math.random() * 20) + 1),
        'state': 'executing',
        'numberOfProcessedFiles': Math.floor((Math.random() * 5) + 1),
        'title': 'process ' + Math.floor((Math.random() * 10000) + 1),
        'type': sampleTypesOfProcess[Math.floor((Math.random() * sampleTypesOfProcess.length))]
    };
};

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
            processesData.splice(0, maxNumberOrProcesses/2);
        }

        startGeneratingData(refreshRate);
    }, length );

};

startGeneratingData(0);

module.exports = processesData;
