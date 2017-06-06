function HeadingWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {string}
     */
    this.id = HeadingWidget.id;

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'headingWidget';

    /**
     * @type {*}
     */
    this.instrument = undefined;

    this.init = function ()
    {
        var segment = $('#HeadingWidget');
        this.instrument = $.flightIndicator('#headingInstrument', 'heading', {roll:0, pitch:0, size: segment.width(), showBox : false});
        this.subscriber = new Subscriber(GyroStatus.topic, 2, 'headingWidget', this.handleMessage);
        this.subscriber.register();

        segment.height(segment.height() - 17);
    };

    /**
     * @param {GyroStatus} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[HeadingWidget.id];
        widget.instrument.setHeading(message.yaw);
    };


    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };
}

/**
 * @type {string}
 */
HeadingWidget.id = 'headingWidget';