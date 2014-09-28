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

        var _bFixtureTemplate = $('#fixture-template');
        var _fixtureTemplate = _bFixtureTemplate.html();
        _bFixtureTemplate.empty();

        beforeEach(function () {
            $('#fixtures').html(_fixtureTemplate);
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

        describe('#openNext', function () {
            it('should open next tab', function () {
                var m = module();
                m.openNext();
                assert.ok(m._bTabs.find('._name_baz').hasClass('_state_current'));
                assert.equal(m._bTabs.find('._state_current').length, 1);
                assert.ok(m._bPanels.find('._name_baz').hasClass('_state_current'));
                assert.equal(m._bPanels.find('._state_current').length, 2);
                m.openNext();
                assert.ok(m._bTabs.find('._name_qux').hasClass('_state_current'));
                assert.ok(m._bPanels.find('._name_qux').hasClass('_state_current'));
            });

            it('should open first tab if current is last', function () {
                var m = module();
                m.openNext();
                m.openNext();
                m.openNext();
                assert.ok(m._bTabs.find('._name_foo').hasClass('_state_current'));
            });
        });

        describe('#openPrev', function () {
            it('should open prev tab', function () {
                var m = module();
                m._openTab('baz');
                m.openPrev();
                assert.ok(m._bTabs.find('._name_bar').hasClass('_state_current'));
                m.openPrev();
                assert.ok(m._bTabs.find('._name_foo').hasClass('_state_current'));
            });

            it('should close other tabs', function () {
                var m = module();
                m.openPrev();
                assert.equal(m._bTabs.find('._state_current').length, 1);
            });

            it('should open last tab if current is first', function () {
                var m = module();
                m.openPrev();
                m.openPrev();
                assert.ok(m._bTabs.find('._name_qux').hasClass('_state_current'));
            });
        });

        describe('#_openTab', function () {
            it('should open tab', function () {
                var m = module();
                m._openTab('foo');
                assert.ok(m._bTabs.find('._name_foo').hasClass('_state_current'));

                m._openTab('qux');
                assert.ok(m._bTabs.find('._name_qux').hasClass('_state_current'));
            });

            it('should close other tabs', function () {
                var m = module();
                m._openTab('foo');
                assert.equal(m._bTabs.find('._state_current').length, 1);
            });

            it('should open tab panel', function () {
                var m = module();
                m._openTab('foo');
                assert.ok(m._bPanels.find('._name_foo').hasClass('_state_current'));
            });
        });

        describe('#_openPanel', function () {
            it('should open panel', function () {
                var m = module();
                m._openPanel('foo');
                assert.ok(m._bPanels.find('._name_foo').hasClass('_state_current'));
                m._openPanel('qux');
                assert.ok(m._bPanels.find('._name_qux').hasClass('_state_current'));
            });

            it('should close other panels', function () {
                var m = module();
                m._openPanel('foo');
                assert.equal(m._bPanels.find('._state_current').length, 2);
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
                        assert.equal(m._bPanels.find('._state_current').length, 2);

                        var bazTab = m._bTabs.find('._name_baz');
                        bazTab.trigger('click');
                        setTimeout(function () {
                            assert.ok(bazTab.hasClass('_state_current'));
                            assert.equal(m._bTabs.find('._state_current').length, 1);
                            assert.ok(m._bPanels.find('._name_baz').hasClass('_state_current'));
                            assert.equal(m._bPanels.find('._state_current').length, 2);
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
                            .addClass('_name_quux')
                            .data('name', 'quux')
                            .children()
                            .text('Quux Tab')
                            .parent()
                    );
                    // Add new panel
                    $(m._bPanels[0]).append(
                        $(m._bPanels[0]).find('._name_foo')
                            .clone()
                            .removeClass('_name_foo')
                            .addClass('_name_quux')
                            .data('name', 'quux')
                            .text('Quux Panel')
                    );
                    // Add new panel 2
                    $(m._bPanels[1]).append(
                        $(m._bPanels[1]).find('._name_foo')
                            .clone()
                            .removeClass('_name_foo')
                            .addClass('_name_quux')
                            .data('name', 'quux')
                            .text('Quux Panel 2')
                    );
                    m._bTabs.find('._name_quux').trigger('click');
                    setTimeout(function () {
                        assert.ok(m._bTabs.find('._name_quux').hasClass('_state_current'));
                        assert.equal(m._bTabs.find('._state_current').length, 1);
                        assert.ok(m._bPanels.find('._name_quux').hasClass('_state_current'));
                        assert.equal(m._bPanels.find('._state_current').length, 2);
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
                        assert.equal(m._bPanels.find('._state_current').length, 2);
                        done();
                    });
                });

                it('should open prev tab when press arrow left key', function (done) {
                    var m = module();
                    var keyEvent = $.Event('keyup');
                    keyEvent.keyCode = 37;
                    m._bTabs.find('._state_current').trigger(keyEvent);
                    setTimeout(function () {
                        assert.ok(m._bTabs.find('._name_foo').hasClass('_state_current'));
                        assert.equal(m._bTabs.find('._state_current').length, 1);
                        assert.ok(m._bPanels.find('._name_foo').hasClass('_state_current'));
                        assert.equal(m._bPanels.find('._state_current').length, 2);
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
