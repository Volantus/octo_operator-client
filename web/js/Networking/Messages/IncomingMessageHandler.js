function IncomingMessageHandler()
{
    /**
     * @param {Object} message
     */
    this.handle = function (message)
    {
        switch (message.type) {
            case 'topicStatus':
                this.handleTopicStatusMessage(message);
                break;
            case 'topicContainer':
                this.handleTopicContainer(message);
                break;
            default:
                console.log("Unable to handle incoming message of unknown type " + message.type);
        }
    };

    /**
     * @param {Object} message
     */
    this.handleTopicStatusMessage = function (message)
    {
        var status = [];

        $.each(message.data.status, function (i, statusData) {
            status.push(new TopicStatus(statusData.name, statusData.revision));
        });

        app.SubscriptionController.onNewTopicStatus(status);
    };

    /**
     * @param {Object} message
     */
    this.handleTopicContainer = function (message)
    {
        console.log(message);
    }
}