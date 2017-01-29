function AttitudeWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'attitudeWidget';

    /**
     * @type {*}
     */
    this.instrument = undefined;

    this.init = function ()
    {
        this.instrument = $.flightIndicator('#attitude', 'attitude', {roll:0, pitch:0, size: $('#AttitudeWidget').width(), showBox : false});
        this.subscriber = new Subscriber(GyroStatus.topic, 2, 'attitudeWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {GyroStatus} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[AttitudeWidget.id];
        widget.instrument.setRoll(message.roll);
        widget.instrument.setPitch(message.pitch);
    };


    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };
}

/**
 * @type {string}
 */
AttitudeWidget.id = 'attitudeWidget';