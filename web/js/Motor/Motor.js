/**
 * @param {int} id
 * @param {int} pin
 * @param {int} power
 * @constructor
 */
function Motor(id, pin, power)
{
    /**
     * @type {number}
     */
    var MIN_POWER = 1000;

    /**
     * @type {number}
     */
    var MAX_POWER = 2000;

    /**
     * @type {number}
     */
    var POWER_RANGE = MAX_POWER -  MIN_POWER;

    /**
     * @type {Number}
     */
    this.id = id;

    /**
     * @type {Number}
     */
    this.pin = pin;

    /**
     * @type {Number}
     */
    this.power = power;

    /**
     * @returns {number}
     */
    this.getPowerInPercent = function ()
    {
        return ((power - MIN_POWER) / POWER_RANGE) * 100;
    }
}