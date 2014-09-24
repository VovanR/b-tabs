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

            it('should have tabs block', function () {
                var m = module();
                assert.isDefined(m._bTabs[0]);
            });

            it('should have panels block', function () {
                var m = module();
                assert.isDefined(m._bPanels[0]);
            });
        });

        describe('#getName', function () {
            it('should return name', function () {
                var m = module();
                assert.equal(m.getName(), 'test');
            });
        });

        describe('ui', function () {
            describe('click on tab', function () {
                it('should open this tab', function () {
                    var m = module();
                    var fooTab = m._bTabs.filter('._name_foo');
                    fooTab.trigger('click');
                    assert.ok(fooTab.hasClass('_state_current'));
                    assert.equal(m._bTabs.filter('._state_current').length, 0);
                    assert.ok(m._bPanels.filter('._name_foo').hasClass('_state_current'));
                    assert.equal(m._bPanels.filter('._state_current').length, 0);
                });
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
