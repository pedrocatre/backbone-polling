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
            case 'Refactoring':
                return 'fa fa-tasks';
            case 'Testing':
                return 'fa fa-bug';
            case 'Implementing':
                return 'fa fa-cogs';
            case 'Compressing':
                return 'fa fa-wrench';
            case 'Hammering':
                return 'fa fa-gavel';
            case 'Forking':
                return 'fa fa-code-fork';
        }
        return '';
    });
});

