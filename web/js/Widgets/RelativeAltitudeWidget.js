function RelativeAltitudeWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'relativeAltitudeWidget';

    /**
     * @type {*}
     */
    this.value = undefined;

    /**
     * @type {*}
     */
    this.statistic = undefined;

    /**
     * @type {number}
     */
    this.baseAltitude = undefined;

    this.init = function ()
    {
        this.value = $('#RelativeAltitudeWidget').find('.value');
        this.statistic = $('#RelativeAltitudeWidget').find('.statistic');
        this.subscriber = new Subscriber(GeoPositionMessage.topic, 3, 'relativeAltitudeWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {GeoPosition} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[RelativeAltitudeWidget.id];

        if (widget.baseAltitude === undefined) {
            widget.baseAltitude = message.altitude;
        } else {
            var relativeAltitude = message.altitude - widget.baseAltitude;
            widget.value.html(relativeAltitude.toFixed(2));
            widget.statistic.removeClass('red orange green');

            if (relativeAltitude < 1) {
                widget.statistic.addClass('red');
            } else if(relativeAltitude < 3) {
                widget.statistic.addClass('orange');
            } else {
                widget.statistic.addClass('green');
            }
        }
    };


    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };
}

/**
 * @type {string}
 */
RelativeAltitudeWidget.id = 'relativeAltitudeWidget';