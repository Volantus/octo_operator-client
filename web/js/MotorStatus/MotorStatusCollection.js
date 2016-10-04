/**
 * @param {Object} time
 * @param {MotorStatus[]} motors
 * @constructor
 */
function MotorStatusCollection(time, motors)
{
    this.time   = time;
    this.motors = motors;
}

/**
 * @param {int} position
 * @returns {MotorStatus}
 */
MotorStatusCollection.prototype.getPosition = function (position)
{
    return this.motors[position];
};