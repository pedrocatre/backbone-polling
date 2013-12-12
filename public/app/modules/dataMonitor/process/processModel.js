/**
 * An simple example model to represent a process
 */
define(['backbone'],
    function (Backbone) {

        var Process = Backbone.Model.extend({

            idAttribute: 'Id',

            defaults: {
                typeOfProcess: 'Refactoring',
                percentageComplete: 0,
                state: 'executing',
                numberOfProcessedFiles: 0,
                title: ''
            }

        });

        return Process;
    });