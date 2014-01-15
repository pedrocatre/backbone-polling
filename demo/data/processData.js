/**
 * Generate dummy process data
 */
(function() {
    var processData = { value: 0 },
        MAX_VALUE = 3000,
        REFRESH_RATE_MS = 500;

    var startGeneratingData = function(refreshRateMs) {
        var self = this;
        this.timeout = setTimeout(function() {

            // Update existing process value
            processData.value = Math.floor((Math.random() * MAX_VALUE));

            startGeneratingData(REFRESH_RATE_MS);
        }, refreshRateMs );

    };

    startGeneratingData(0);

    module.exports = processData;
}).call(this);
