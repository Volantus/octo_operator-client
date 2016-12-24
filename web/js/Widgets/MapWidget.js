function MapWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    this.init = function ()
    {
        this.subscriber = new Subscriber(GeoPositionMessage.topic, 5, 'MapWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {GeoPositionMessage} message
     */
    this.handleMessage = function (message)
    {

    };

    this.tearDown = function ()
    {
        this.subscriber.unregister();
    }
}

/**
 * @type {string}
 */
MapWidget.id = 'mapWidget';