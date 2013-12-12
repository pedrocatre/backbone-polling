/**
 * Helper functions to be used in handlebars' templates
 */
define(['handlebars', 'underscore'],
    function (Handlebars, _) {

        Handlebars.registerHelper('determineIconGivenTypeOfProcess', function(typeOfProcess) {
            switch(typeOfProcess)
            {
                case 'Refactoring':
                    return 'fa fa-tasks';
                    break;
                case 'Testing':
                    return 'fa fa-bug';
                    break;
                case 'Implementing':
                    return 'fa fa-cogs';
                    break;
                case 'Compressing':
                    return 'fa fa-wrench';
                    break;
                case 'Hammering':
                    return 'fa fa-gavel';
                    break;
                case 'Forking':
                    return 'fa fa-code-fork';
                    break;

            }
            return '';
        });



    });

