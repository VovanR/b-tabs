/**
 * @author VovanR <mail@vovanr.com>
 */

define([
], function (
) {

    var Tabs;

    /**
     * Tabs module
     *
     * @constructor
     */
    Tabs = function () {
        this.name = 'Tabs';
    };

    Tabs.prototype = {
        /**
         * Returns module name
         *
         * @returns {String} name
         */
        getName: function () {
            return this.name;
        },
    };

    return Tabs;

});
