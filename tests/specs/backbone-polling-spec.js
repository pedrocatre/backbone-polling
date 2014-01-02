describe('Backbone Polling Methods', function() {

    beforeEach(function() {
        this.BackboneCollection = Backbone.Collection.extend({
            url: '/processes'
        });

        // Add backbone polling mixin
        _.extend(this.BackboneCollection.prototype, window.BackbonePolling);
        this.collection = new this.BackboneCollection();

        this.BackboneModel = Backbone.Model.extend({
            url: '/process'
        });

        // Add backbone polling mixin
        _.extend(this.BackboneModel.prototype, window.BackbonePolling);
        this.model = new this.BackboneModel();
    });

    afterEach(function() {
        delete this.model;
        delete this.collection;
    });

    it('can start fetching', function() {
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 3;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            dfd.resolve();
            return dfd.promise();
        });

        var callback = jasmine.createSpy();

        this.collection.configure({
            refresh: 10,
            done: function(){
                continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing);
            },
            always: callback
        });
        this.collection.startFetching();

        waitsFor(function(){
            return continueFlag;
        });

        runs(function () {
            expect(this.collection.isFetching()).toBe(true);
            expect(callback).toHaveBeenCalled();
            expect(callback.callCount).toBe(numberOfTimesToCallBeforeContinuing);
        });
    });

    it('can configure callback functions', function() {
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 3;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            if(counter < numberOfTimesToCallBeforeContinuing) {
                dfd.resolve();
            } else {
                dfd.reject();
            }
            return dfd.promise();
        });

        var callbackFail = jasmine.createSpy();
        var callbackDone = jasmine.createSpy();

        this.collection.configure({
            refresh: 10,
            done: callbackDone,
            fail: callbackFail,
            always: function() {
                continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing);
            }
        });
        this.collection.startFetching();

        waitsFor(function(){
            return continueFlag;
        });

        runs(function () {
            expect(this.collection.isFetching()).toBe(true);
            expect(callbackDone).toHaveBeenCalled();
            expect(callbackFail).toHaveBeenCalled();
            expect(callbackDone.callCount).toBe(2);
            expect(callbackFail.callCount).toBe(1);
        });
    });

});
