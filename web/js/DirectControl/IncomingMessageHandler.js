function IncomingMessageHandler()
{
    /**
     * @param {Object} message
     */
    this.handle = function (message)
    {
        switch (message.type) {
            case 'motorStatus':
                this.handleMotorStatus(message);
                break;
            case 'acknowledgeMessage':
                this.handleAcknowledge(message);
                break;
            default:
                console.log("Unable to handle incoming message of unknown type " + message.type);
        }
    };

    /**
     * @param {Object} message
     */
    this.handleMotorStatus = function (message)
    {
        var collection = MotorStatusCollectionFactory.createFromMessage(message);
        app.MotorStatusRepository.addStatusCollection(collection);
    };

    /**
     * @param {Object} message
     */
    this.handleAcknowledge = function (message)
    {
        var acknowledge = AcknowledgeMessageFactory.createFromMessage(message);
        app.ControlRequestsWidget.acknowledgeReceived(acknowledge);
    }
}