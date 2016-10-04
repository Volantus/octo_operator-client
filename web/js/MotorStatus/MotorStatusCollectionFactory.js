function MotorStatusCollectionFactory()
{
}

/**
 *
 * @param {Object} message
 * @returns {MotorStatusCollection}
 */
MotorStatusCollectionFactory.createFromMessage = function (message)
{
    var time = moment(message.time);
    var motors = [];

    $.each(message.data, function (position, motorData) {
        motors.push(new MotorStatus(position, motorData.started, motorData.currentSpeed));
    });

    return new MotorStatusCollection(time, motors);
};