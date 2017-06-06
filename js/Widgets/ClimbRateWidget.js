function ClimbRateWidget()
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
    this.templateId = 'climbRateWidget';

    /**
     * @type {*}
     */
    this.value = undefined;

    /**
     * @type {*}
     */
    this.statistic = undefined;

    /**
     * @type {Array}
     */
    this.values = [];

    /**
     * @type {number}
     */
    this.maxValues = 10;

    this.init = function ()
    {
        this.value = $('#ClimbRateWidget').find('.value');
        this.statistic = $('#ClimbRateWidget').find('.statistic');
        this.subscriber = new Subscriber(GeoPositionMessage.topic, 12, 'climbRateWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {GeoPosition} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[ClimbRateWidget.id];
        widget.values.push(message.altitude);

        if (widget.values.length > widget.maxValues) {
            widget.values.splice(0, 1);
        }

        var climbRate = (widget.values[widget.values.length - 1] - widget.values[0]) / widget.values.length;
        widget.value.html(climbRate.toFixed(2));

        widget.statistic.removeClass('orange green');
        if (climbRate < 0) {
            widget.statistic.addClass('orange');
        } else if (climbRate > 0) {
            widget.statistic.addClass('green');
        }
    };


    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };
}

ClimbRateWidget.id = 'climbRateWidget';