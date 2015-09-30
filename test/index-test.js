requirejs([
    'jquery',
    'chai',
    'sinon',
    'lodash',
    '../index',
], function (
    $,
    chai,
    sinon,
    _,
    Tabs
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('Tabs', function () {
        /**
         * @return {Tabs}
         * @public
         */
        var module = function () {
            return new Tabs({
                name: 'test',
            });
        };

        var _$fixtureTemplate = $('#fixture-template');
        var _fixtureTemplate = _$fixtureTemplate.html();
        _$fixtureTemplate.empty();

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
                assert.isDefined(m._$tabs[0]);
            });

            it('should have panels block', function () {
                var m = module();
                assert.isDefined(m._$panels[0]);
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
                assert.ok(m._$tabs.find('._name_baz').hasClass('_state_current'));
                assert.equal(m._$tabs.find('._state_current').length, 1);
                assert.ok(m._$panels.find('._name_baz').hasClass('_state_current'));
                assert.equal(m._$panels.find('._state_current').length, 2);
                m.openNext();
                assert.ok(m._$tabs.find('._name_qux').hasClass('_state_current'));
                assert.ok(m._$panels.find('._name_qux').hasClass('_state_current'));
            });

            it('should open first tab if current is last', function () {
                var m = module();
                m.openNext();
                m.openNext();
                m.openNext();
                assert.ok(m._$tabs.find('._name_foo').hasClass('_state_current'));
            });
        });

        describe('#openPrev', function () {
            it('should open prev tab', function () {
                var m = module();
                m._openTab('baz');
                m.openPrev();
                assert.ok(m._$tabs.find('._name_bar').hasClass('_state_current'));
                m.openPrev();
                assert.ok(m._$tabs.find('._name_foo').hasClass('_state_current'));
            });

            it('should close other tabs', function () {
                var m = module();
                m.openPrev();
                assert.equal(m._$tabs.find('._state_current').length, 1);
            });

            it('should open last tab if current is first', function () {
                var m = module();
                m.openPrev();
                m.openPrev();
                assert.ok(m._$tabs.find('._name_qux').hasClass('_state_current'));
            });
        });

        describe('#_openTab', function () {
            it('should open tab', function () {
                var m = module();
                m._openTab('foo');
                assert.ok(m._$tabs.find('._name_foo').hasClass('_state_current'));

                m._openTab('qux');
                assert.ok(m._$tabs.find('._name_qux').hasClass('_state_current'));
            });

            it('should close other tabs', function () {
                var m = module();
                m._openTab('foo');
                assert.equal(m._$tabs.find('._state_current').length, 1);
            });

            it('should open tab panel', function () {
                var m = module();
                m._openTab('foo');
                assert.ok(m._$panels.find('._name_foo').hasClass('_state_current'));
            });
        });

        describe('#_openPanel', function () {
            it('should open panel', function () {
                var m = module();
                m._openPanel('foo');
                assert.ok(m._$panels.find('._name_foo').hasClass('_state_current'));
                m._openPanel('qux');
                assert.ok(m._$panels.find('._name_qux').hasClass('_state_current'));
            });

            it('should close other panels', function () {
                var m = module();
                m._openPanel('foo');
                assert.equal(m._$panels.find('._state_current').length, 2);
            });
        });

        describe('ui', function () {
            describe('click on tab', function () {
                it('should open this tab', function (done) {
                    var m = module();
                    var fooTab = m._$tabs.find('._name_foo');
                    fooTab.trigger('click');
                    setTimeout(function () {
                        assert.ok(fooTab.hasClass('_state_current'));
                        assert.equal(m._$tabs.find('._state_current').length, 1);
                        assert.ok(m._$panels.find('._name_foo').hasClass('_state_current'));
                        assert.equal(m._$panels.find('._state_current').length, 2);

                        var bazTab = m._$tabs.find('._name_baz');
                        bazTab.trigger('click');
                        setTimeout(function () {
                            assert.ok(bazTab.hasClass('_state_current'));
                            assert.equal(m._$tabs.find('._state_current').length, 1);
                            assert.ok(m._$panels.find('._name_baz').hasClass('_state_current'));
                            assert.equal(m._$panels.find('._state_current').length, 2);
                            done();
                        });
                    });
                });
            });

            describe('provide new tabs', function () {
                it('should clickable for open new panel', function (done) {
                    var m = module();
                    // Add new tab
                    m._$tabs.append(
                        m._$tabs.find('._name_foo')
                            .clone()
                            .removeClass('_name_foo')
                            .addClass('_name_quux')
                            .data('name', 'quux')
                            .children()
                            .text('Quux Tab')
                            .parent()
                    );
                    // Add new panel
                    $(m._$panels[0]).append(
                        $(m._$panels[0]).find('._name_foo')
                            .clone()
                            .removeClass('_name_foo')
                            .addClass('_name_quux')
                            .data('name', 'quux')
                            .text('Quux Panel')
                    );
                    // Add new panel 2
                    $(m._$panels[1]).append(
                        $(m._$panels[1]).find('._name_foo')
                            .clone()
                            .removeClass('_name_foo')
                            .addClass('_name_quux')
                            .data('name', 'quux')
                            .text('Quux Panel 2')
                    );
                    m._$tabs.find('._name_quux').trigger('click');
                    setTimeout(function () {
                        assert.ok(m._$tabs.find('._name_quux').hasClass('_state_current'));
                        assert.equal(m._$tabs.find('._state_current').length, 1);
                        assert.ok(m._$panels.find('._name_quux').hasClass('_state_current'));
                        assert.equal(m._$panels.find('._state_current').length, 2);
                        done();
                    });
                });
            });

            describe('navigate with arrow keys', function () {
                it('should open next tab when press arrow right key', function (done) {
                    var m = module();
                    var keyEvent = $.Event('keyup');
                    keyEvent.keyCode = 39;
                    m._$tabs.find('._state_current').trigger(keyEvent);
                    setTimeout(function () {
                        assert.ok(m._$tabs.find('._name_baz').hasClass('_state_current'));
                        assert.equal(m._$tabs.find('._state_current').length, 1);
                        assert.ok(m._$panels.find('._name_baz').hasClass('_state_current'));
                        assert.equal(m._$panels.find('._state_current').length, 2);
                        done();
                    });
                });

                it('should open prev tab when press arrow left key', function (done) {
                    var m = module();
                    var keyEvent = $.Event('keyup');
                    keyEvent.keyCode = 37;
                    m._$tabs.find('._state_current').trigger(keyEvent);
                    setTimeout(function () {
                        assert.ok(m._$tabs.find('._name_foo').hasClass('_state_current'));
                        assert.equal(m._$tabs.find('._state_current').length, 1);
                        assert.ok(m._$panels.find('._name_foo').hasClass('_state_current'));
                        assert.equal(m._$panels.find('._state_current').length, 2);
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
