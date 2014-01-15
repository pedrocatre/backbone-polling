/**
 * Generate dummy process data
 */
(function() {
    var processData = {value: 0};

    var maxValue = 3000;

    var refreshRate = 500;

    var startGeneratingData = function(length) {
        var self = this;
        this.timeout = setTimeout(function() {

            // Update existing process value
            processData.value = Math.floor((Math.random() * 3000));

            startGeneratingData(refreshRate);
        }, length );

    };

    startGeneratingData(0);

    module.exports = processData;
}).call(this);
