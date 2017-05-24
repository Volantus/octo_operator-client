/**
 * @param {number} Kp
 * @param {number} Ki
 * @param {number} Kd
 * @constructor
 */
function PidTuningStatus(Kp, Ki, Kd)
{
    /**
     * @type {number}
     */
    this.Kp = Kp;

    /**
     * @type {number}
     */
    this.Ki = Ki;

    /**
     * @type {number}
     */
    this.Kd = Kd;
}