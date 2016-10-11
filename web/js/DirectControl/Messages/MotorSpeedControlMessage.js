/**
 * @param {Array} motors
 * @param {string} title
 * @param {number} delta
 * @constructor
 */
function MotorSpeedControlMessage(motors, title, delta)
{
    var data = {
        motorPositions: motors,
        delta: delta
    };

    AbstractMessage.call(this, 'motorSpeedChange', title, data);
}