/**
 * Helper functions to be used in handlebars' templates
 */
define(['handlebars',
    'underscore'
], function (Handlebars, _) {
    'use strict';

    Handlebars.registerHelper('determineIconGivenTypeOfProcess', function(typeOfProcess) {
        switch(typeOfProcess)
        {
            case 'Performance':
                return 'fa fa-tachometer';
            case 'Tests':
                return 'fa fa-bug';
            case 'Nightly':
                return 'fa fa-cogs';
            case 'Compressing':
                return 'fa fa-compress';
            case 'Hive':
                return 'fa fa-tasks';
            case 'Backup':
                return 'fa fa-floppy-o';
        }
        return '';
    });
});

