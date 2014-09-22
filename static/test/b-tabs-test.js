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
            return new Tabs({
                name: 'test',
            });
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

            it('should throw if no options', function () {
                assert.throw(function () {
                    var m = new Tabs();
                });
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
