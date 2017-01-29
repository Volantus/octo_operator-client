/**
 * @param {TopicStatus} topic
 * @param {moment} receivedAt
 * @param {float} yaw
 * @param {float} pitch
 * @param {float} roll
 * @constructor
 */
function GyroStatus(topic, receivedAt, yaw, pitch, roll)
{
    AbstractTopicMessage.call(this, topic, receivedAt);

    /**
     * @type {float}
     */
    this.yaw = yaw;

    /**
     * @type {float}
     */
    this.pitch = pitch;

    /**
     * @type {float}
     */
    this.roll = roll;
}

GyroStatus.topic = 'gyroStatus';