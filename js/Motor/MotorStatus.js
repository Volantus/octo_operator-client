/**
 * @param {TopicStatus} topic
 * @param {moment} receivedAt
 * @param {Motor[]} motors
 * @constructor
 */
function MotorStatus(topic, receivedAt, motors)
{
    AbstractTopicMessage.call(this, topic, receivedAt);

    /**
     * @type {Motor[]}
     */
    this.motors = motors;
}

/**
 * @type {string}
 */
MotorStatus.topic = 'motorStatus';