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
            case 'motorStatus':
                message = new MotorStatus(topic, receivedAt, this.buildMotors(data.payload.motors));
                app.SubscriptionController.distributeTopicContainer(message);
                break;
            case 'pidFrequencyStatus':
                message = new PidFrequencyStatus(topic, receivedAt, data.payload.desired, data.payload.current);
                app.SubscriptionController.distributeTopicContainer(message);
                break;
            case 'pidTuningStatus':
                message = new PidTuningStatusCollection(topic, receivedAt, this.buildPidTuningStatus(data.payload.yaw), this.buildPidTuningStatus(data.payload.roll), this.buildPidTuningStatus(data.payload.pitch));
                app.SubscriptionController.distributeTopicContainer(message);
                break;
        }
    };

    /**
     * @param {*} data
     * @returns {Motor[]}
     */
    this.buildMotors = function (data) 
    {
        return [
            new Motor(data[0].id, data[0].pin, data[0].power),
            new Motor(data[1].id, data[1].pin, data[1].power),
            new Motor(data[2].id, data[2].pin, data[2].power),
            new Motor(data[3].id, data[3].pin, data[3].power),
            new Motor(data[4].id, data[4].pin, data[4].power),
            new Motor(data[5].id, data[5].pin, data[5].power),
            new Motor(data[6].id, data[6].pin, data[6].power),
            new Motor(data[7].id, data[7].pin, data[7].power),
            new Motor(data[8].id, data[8].pin, data[8].power),
            new Motor(data[9].id, data[9].pin, data[9].power)
        ];
    };

    /**
     * @param {*} data
     * @returns {PidTuningStatus}
     */
    this.buildPidTuningStatus = function (data)
    {
        return new PidTuningStatus(data.Kp, data.Ki, data.Kd);
    }
}