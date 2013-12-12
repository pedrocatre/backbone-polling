/**
 * The process collection that inherits from BackbonePollCollection
 */
define([
    'backbonePollCollection',
    'processModel'
], function (BackbonePollCollection, ProcessModel) {

    return BackbonePollCollection.extend({
        url: '/processes',

        model: ProcessModel,

        initialize: function() {
            // I'm putting this here so you don't forget to call the `BackbonePollCollection`
            // `initialize` when overriding the method
            BackbonePollCollection.prototype.initialize.apply(this, arguments);
        }
    });
});