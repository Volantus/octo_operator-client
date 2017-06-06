function AbsoluteAltitudeWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {string}
     */
    this.id = AbsoluteAltitudeWidget.id;

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'absoluteAltitudeWidget';

    /**
     * @type {*}
     */
    this.value = undefined;

    this.init = function ()
    {
        this.value = $('#AbsoluteAltitudeWidget').find('.value');
        this.subscriber = new Subscriber(GeoPositionMessage.topic, 3, 'absoluteAltitudeWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {GeoPosition} message
     */
    this.handleMessage = function (message)
    {
        app.WidgetController.widgets[AbsoluteAltitudeWidget.id].value.html(message.altitude.toFixed(2));
    };


    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };
}

/**
 * @type {string}
 */
AbsoluteAltitudeWidget.id = 'absoluteAltitudeWidget';