/**
 * @param {Object} time
 * @param {MotorStatus[]} motors
 * @constructor
 */
function MotorStatusCollection(time, motors)
{
    this.time   = time;
    this.motors = motors;

    /**
     * @param {int} position
     * @returns {MotorStatus}
     */
    this.getPosition = function (position)
    {
        return this.motors[position];
    };
}