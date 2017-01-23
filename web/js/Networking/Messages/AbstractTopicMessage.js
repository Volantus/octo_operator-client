/**
 * @param {TopicStatus} topic
 * @param {moment} receivedAt
 * @constructor
 */
function AbstractTopicMessage(topic, receivedAt)
{
    /**
     * @type {TopicStatus}
     */
    this.topic = topic;

    /**
     * @type {moment}
     */
    this.receivedAt = receivedAt;
}