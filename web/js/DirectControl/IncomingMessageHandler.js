function IncomingMessageHandler()
{
}

/**
 * @param {Object} message
 */
IncomingMessageHandler.prototype.handle = function (message)
{
    switch (message.type) {
        case "motorStatus":
            this.handleMotorStatus(message);
            break;
        default:
            console.log("Unable to handle incoming message of unknown type " + message.type);
    }
};

IncomingMessageHandler.prototype.handleMotorStatus = function (message)
{
    var collection = MotorStatusCollectionFactory.createFromMessage(message);

    console.log(collection);

    app.MotorStatusController.addStatusCollection(collection);
};