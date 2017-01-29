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
                this.handleTopicContainer(message.data);
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
     * @param {{topic: *, receivedAt: *, payload: *}} data
     */
    this.handleTopicContainer = function (data)
    {
        var topic = new TopicStatus(data.topic.name, data.topic.revision);
        var receivedAt = moment(data.receivedAt);
        var message = undefined;

        switch (data.topic.name) {
            case 'geoPosition':
                message = new GeoPosition(topic, receivedAt, data.payload.latitude, data.payload.longitude, data.payload.altitude);
                app.SubscriptionController.distributeTopicContainer(message);
                break;
            case 'gyroStatus':
                message = new GyroStatus(topic, receivedAt, data.payload.yaw, data.payload.pitch, data.payload.roll);
                app.SubscriptionController.distributeTopicContainer(message);
                break;
        }
    }
}