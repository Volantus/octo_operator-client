/**
 * @param {number} yaw
 * @param {number} pitch
 * @param {number} roll
 * @param {number} horizontalThrottle
 * @param {number} verticalThrottle
 * @param {boolean} motorsStarted
 * @constructor
 */
function MotorControlMessage(yaw, pitch, roll, horizontalThrottle, verticalThrottle, motorsStarted)
{
    AbstractMessage.call(this);

    /**
     * @type {string}
     */
    this.title = 'Motor control';

    /**
     * @type {string}
     */
    this.type = 'motorControl';

    /**
     * @type {{desiredPosition: {yaw: float, pitch: float, roll: float}, horizontalThrottle: float, verticalThrottle: float, motorsStarted: bool}}
     */
    this.data = {
        desiredPosition: {
            yaw: yaw,
            pitch: pitch,
            roll: roll
        },
        horizontalThrottle: horizontalThrottle,
        verticalThrottle: verticalThrottle,
        motorsStarted: motorsStarted
    };
}

MotorControlMessage.topic = 'motorControl';