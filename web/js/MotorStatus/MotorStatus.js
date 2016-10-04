/**
 * @param {int}     position
 * @param {bool}    started
 * @param {number}  currentSpeed
 * @constructor
 */
function MotorStatus(position, started, currentSpeed)
{
    /**
     * @type {Number}
     */
    this.position = position;

    /**
     * @type {bool}
     */
    this.started = started;

    /**
     * @type {number}
     */
    this.currentSpeed = currentSpeed;
}