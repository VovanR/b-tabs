/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
], function (
    $
) {

    var Tabs;
    var currentClass = '_state_current';

    /**
     * Tabs module
     *
     * @param {Object} o Options
     * @param {String} o.name
     * @constructor
     */
    Tabs = function (o) {
        this._name = o.name;

        this._bTabs = null;
        this._bPanels = null;

        this._initialize();
    };

    Tabs.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('Tabs init');

            var bTabs = $('.b-tabs._name_' + this._name);
            this._bTabs = bTabs.filter('.b-tabs__tabs');
            this._bPanels = bTabs.filter('.b-tabs__panels');

            this._bindControls();
        },

        /**
         * Bindings
         *
         * @private
         */
        _bindControls: function () {
            var _this = this; // Save context

            this._bTabs.on('click', '.b-tabs__tab', function (e) {
                var $this = $(this);
                var name = $this.data('name');
                _this._bTabs.find('.b-tabs__tab')
                    .removeClass(currentClass)
                    .filter('._name_' + name)
                    .addClass(currentClass);
                _this._bPanels.find('.b-tabs__panel')
                    .removeClass(currentClass)
                    .filter('._name_' + name)
                    .addClass(currentClass);

                e.preventDefault();
            });
        },

        /**
         * Returns module name
         *
         * @returns {String} name
         */
        getName: function () {
            return this._name;
        },
    };

    return Tabs;

});
