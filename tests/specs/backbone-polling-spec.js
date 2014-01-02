describe('Backbone Polling Methods', function() {
    beforeEach(function() {
        this.collection = Backbone.Collection.extend({
            url: '/processes'
        });

        // Add backbone polling mixin
        _.extend(this.collection.prototype, window.BackbonePolling);
    });
    it('Shoud just work', function(){
        expect(1 + 2).toBe(3);
    });

});
