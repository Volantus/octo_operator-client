/**
 * @param {TopicStatus} topic
 * @param {moment} receivedAt
 * @param {number} desired
 * @param {number} current
 * @constructor
 */
function PidFrequencyStatus(topic, receivedAt, desired, current)
{
    AbstractTopicMessage.call(this, topic, receivedAt);

    /**
     * @type {number}
     */
    this.desired = desired;

    /**
     * @type {number}
     */
    this.current = current;
}

PidFrequencyStatus.topic = 'pidFrequencyStatus';