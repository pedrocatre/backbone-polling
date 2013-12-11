/**
 * The process collection that inherits from BackbonePollCollection
 */
define(['backbone', 'processModel', 'backbonePollCollection'],
    function (Backbone, ProcessModel, BackbonePollCollection) {
        var ProcessCollection = BackbonePollCollection.extend({
            url: 'http://localhost:3000/processes',

            model: ProcessModel,

            initialize: function(){
                BackbonePollCollection.prototype.initialize.apply(this, arguments);
                return this;
            }
        });

        return ProcessCollection;
    });