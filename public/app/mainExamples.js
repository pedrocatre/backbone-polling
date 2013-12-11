/**
 * Responsible for starting the execution of the application
 */
require(['main'], function (main) {
    require([
        'app', 'appUtils', 'backbone', 'respond'], function (App, AppUtils, Backbone) {

        // Make console.log not throw error if it is not supported by the browser
        if (typeof console === "undefined"){
            console={};
            console.log = function(){
				return;
			};
        }
        window.AppUtils.vent = _.extend({}, Backbone.Events);
        App.initialize();
    });
});