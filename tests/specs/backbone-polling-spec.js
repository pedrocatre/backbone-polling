describe('Backbone Polling Methods', function() {
    beforeEach(function() {
        this.BackboneCollection = Backbone.Collection.extend();

        // Add backbone polling mixin
        _.extend(this.BackboneCollection.prototype, window.BackbonePolling);
        this.collection = new this.BackboneCollection();

        this.model = new Backbone.Model();

        // Add backbone polling mixin
//        _.extend(this.model.prototype, window.BackbonePolling);
    });

    afterEach(function(){
//        this.model.destroy();
        this.collection.stopFetching();

        delete this.model;
        delete this.collection;
    });

    it('Shoud just work', function(){
        expect(Backbone.Collection).not.toBe(undefined);
    });

});
