requirejs([
    '../vendor/chai/chai',
    'jquery',
    '../js/modules/b-tabs',
], function (
    chai,
    $,
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
                it('should open this tab', function (done) {
                    var m = module();
                    var fooTab = m._bTabs.find('._name_foo');
                    fooTab.trigger('click');
                    setTimeout(function () {
                        assert.ok(fooTab.hasClass('_state_current'));
                        assert.equal(m._bTabs.find('._state_current').length, 1);
                        assert.ok(m._bPanels.find('._name_foo').hasClass('_state_current'));
                        assert.equal(m._bPanels.find('._state_current').length, 1);

                        var bazTab = m._bTabs.find('._name_baz');
                        bazTab.trigger('click');
                        setTimeout(function () {
                            assert.ok(bazTab.hasClass('_state_current'));
                            assert.equal(m._bTabs.find('._state_current').length, 1);
                            assert.ok(m._bPanels.find('._name_baz').hasClass('_state_current'));
                            assert.equal(m._bPanels.find('._state_current').length, 1);
                            done();
                        });
                    });
                });
            });

            describe('provide new tabs', function () {
                it('should clickable for open new panel', function (done) {
                    var m = module();
                    // Add new tab
                    m._bTabs.append(
                        m._bTabs.find('._name_foo')
                            .clone()
                            .removeClass('_name_foo')
                            .addClass('_name_qux')
                            .data('name', 'qux')
                            .children()
                            .text('Qux Tab')
                            .parent()
                    );
                    // Add new panel
                    m._bPanels.append(
                        m._bPanels.find('._name_foo')
                            .clone()
                            .removeClass('_name_foo')
                            .addClass('_name_qux')
                            .data('name', 'qux')
                            .text('Qux Pabel')
                    );
                    m._bTabs.find('._name_qux').trigger('click');
                    setTimeout(function () {
                        assert.ok(m._bTabs.find('._name_qux').hasClass('_state_current'));
                        assert.equal(m._bTabs.find('._state_current').length, 1);
                        assert.ok(m._bPanels.find('._name_qux').hasClass('_state_current'));
                        assert.equal(m._bPanels.find('._state_current').length, 1);
                        done();
                    });
                });
            });

            describe('navigate with arrow keys', function () {
                it('should open next tab when press arrow right key', function (done) {
                    var m = module();
                    var keyEvent = $.Event('keyup');
                    keyEvent.keyCode = 39;
                    m._bTabs.find('._state_current').trigger(keyEvent);
                    setTimeout(function () {
                        assert.ok(m._bTabs.find('._name_baz').hasClass('_state_current'));
                        assert.equal(m._bTabs.find('._state_current').length, 1);
                        assert.ok(m._bPanels.find('._name_baz').hasClass('_state_current'));
                        assert.equal(m._bPanels.find('._state_current').length, 1);
                        done();
                    });
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
