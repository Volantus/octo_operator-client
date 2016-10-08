function IncomingMessageHandler()
{
    /**
     * @param {Object} message
     */
    this.handle = function (message)
    {
        switch (message.type) {
            case "motorStatus":
                this.handleMotorStatus(message);
                break;
            default:
                console.log("Unable to handle incoming message of unknown type " + message.type);
        }
    };

    this.handleMotorStatus = function (message)
    {
        var collection = MotorStatusCollectionFactory.createFromMessage(message);
        app.MotorStatusRepository.addStatusCollection(collection);
    };
}