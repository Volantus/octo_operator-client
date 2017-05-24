/**
 * @param {int} id
 * @param {int} pin
 * @param {int} power
 * @constructor
 */
function Motor(id, pin, power)
{
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
        return ((power - Motor.MIN_POWER) / Motor.POWER_RANGE) * 100;
    }
}

Motor.MIN_POWER = 1000;
Motor.MAX_POWER = 2000;
Motor.POWER_RANGE = Motor.MAX_POWER - Motor.MIN_POWER;