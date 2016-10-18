/**
 * @param {string} title
 * @param {int[]} positions
 * @param {int} state
 * @constructor
 */
function MotorStateControlMessage(title, positions, state)
{
    var data = {
        motorPositions: positions,
        state: state
    };

    AbstractMessage.call(this, 'motorStateControl', title, data)
}