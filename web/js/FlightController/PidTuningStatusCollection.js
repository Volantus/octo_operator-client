/**
 * @param {TopicStatus} topic
 * @param {moment} receivedAt
 * @param {PidTuningStatus} yaw
 * @param {PidTuningStatus} roll
 * @param {PidTuningStatus} pitch
 * @constructor
 */
function PidTuningStatusCollection(topic, receivedAt, yaw, roll, pitch)
{
    AbstractTopicMessage.call(this, topic, receivedAt);

    /**
     * @type {PidTuningStatus}
     */
    this.yaw = yaw;

    /**
     * @type {PidTuningStatus}
     */
    this.roll = roll;

    /**
     * @type {PidTuningStatus}
     */
    this.pitch = pitch;
}

/**
 * @type {string}
 */
PidTuningStatusCollection.topic = 'pidTuningStatus';