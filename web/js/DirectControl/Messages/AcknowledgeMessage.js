/**
 * @param {number} messageId
 * @param {string} status
 * @param {number} latency
 * @constructor
 */
function AcknowledgeMessage(messageId, status, latency)
{
    /**
     * @type {number}
     */
    this.messageId = messageId;

    /**
     * @type {string}
     */
    this.status = status;

    /**
     * @type {number}
     */
    this.latency = latency;
}