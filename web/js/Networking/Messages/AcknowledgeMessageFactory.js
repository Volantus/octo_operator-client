function AcknowledgeMessageFactory()
{
}

/**
 * @type {Array}
 */
AcknowledgeMessageFactory.times = [];

/**
 * @param {AbstractMessage} message
 */
AcknowledgeMessageFactory.messageSent = function (message)
{
    this.times[message.id] = moment();
};

/**
 * @param {Object} message
 */
AcknowledgeMessageFactory.createFromMessage = function(message)
{
    if ($.isNumeric(message.data.messageId)) {
        var id = message.data.messageId;
        var latency = moment().diff(this.times[id]);
        return new AcknowledgeMessage(message.data.messageId, message.data.status, latency);
    } else {
        console.log(message)
    }
};