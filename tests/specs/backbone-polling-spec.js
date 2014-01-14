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
        this.collection.stopFetching();
        this.model.stopFetching();
        this.collection.stopListening();
        delete this.model;
        delete this.collection;
    });

    it('can stop start and stop fetching', function() {
        this.collection.startFetching();
        expect(this.collection.isFetching()).toBe(true);
        this.collection.stopFetching();
        expect(this.collection.isFetching()).toBe(false);
    });

    it('can query the data source multiple times', function() {
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 3;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            dfd.resolve();
            return dfd.promise();
        });

        var callback = jasmine.createSpy();

        this.collection.configure({ refresh: 10 });

        this.collection.listenTo(this.collection, 'refresh:done', function() {
            continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing);
        });

        this.collection.listenTo(this.collection, 'refresh:always', callback);

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

        this.collection.configure({ refresh: 10 });

        this.collection.listenTo(this.collection, 'refresh:done', callbackDone);

        this.collection.listenTo(this.collection, 'refresh:fail', callbackFail);

        this.collection.listenTo(this.collection, 'refresh:always', function() {
            continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing);
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

    it('can automatically retry a failed fetch', function() {
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 2;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            dfd.reject();
            return dfd.promise();
        });

        var callbackFail = jasmine.createSpy();

        this.collection.configure({
            refresh: 10,
            retryRequestOnFetchFail: true
        });

        this.collection.listenTo(this.collection, 'refresh:fail', callbackFail);

        this.collection.listenTo(this.collection, 'refresh:always', function() {
            continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing);
        });

        this.collection.startFetching();

        waitsFor(function(){
            return continueFlag;
        });

        runs(function () {
            expect(this.collection.isFetching()).toBe(true);
            expect(callbackFail).toHaveBeenCalled();
            expect(callbackFail.callCount).toBe(numberOfTimesToCallBeforeContinuing);
        });
    });

    it('can disable an automatic retry of a failed fetch', function() {
        var self = this;
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 2;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            dfd.reject();
            return dfd.promise();
        });

        var callbackFail = jasmine.createSpy();

        this.collection.configure({
            refresh: 10,
            retryRequestOnFetchFail: false
        });

        this.collection.listenTo(this.collection, 'refresh:fail', callbackFail);

        this.collection.listenTo(this.collection, 'refresh:always', function() {
            continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing) ||
                (self.collection.isFetching() === false);
        });

        this.collection.startFetching();

        waitsFor(function(){
            return continueFlag;
        });

        runs(function () {
            expect(this.collection.isFetching()).toBe(false);
            expect(callbackFail).toHaveBeenCalled();
            expect(callbackFail.callCount).toBe(1);
        });

    });

});
