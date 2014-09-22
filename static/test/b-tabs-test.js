requirejs([
    '../vendor/chai/chai',
    '../js/modules/b-tabs',
], function (
    chai,
    Tabs
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('Tabs', function () {
        var module = function () {
            return new Tabs();
        };

        beforeEach(function () {
        });

        afterEach(function () {
        });

        describe('constructor', function () {
            it('should initialize', function () {
                var m = module();
                assert.isDefined(m);
            });
        });

        describe('#getName', function () {
            it('should return name', function () {
                var m = module();
                assert.equal(m.getName(), 'Tabs');
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
