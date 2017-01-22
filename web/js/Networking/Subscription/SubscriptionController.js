function SubscriptionsController()
{
    /**
     * @type {Array}
     */
    this.activeSubscriptions = {};

    /**
     * @param {Subscriber} subscriber
     */
    this.subscribe = function (subscriber)
    {
        if (this.activeSubscriptions[subscriber.topic] === undefined) {
            this.activeSubscriptions[subscriber.topic] = [];
        }

        this.activeSubscriptions[subscriber.topic].push(subscriber);

        console.log('[SubscriptionsController] Added subscriber ' + subscriber.name + ' to topic ' + subscriber.topic);
    };

    /**
     * @param {Subscriber} subscriber
     */
    this.unsubscribe = function (subscriber)
    {
        var index = this.activeSubscriptions[subscriber.topic].indexOf(subscriber);
        this.activeSubscriptions[subscriber.topic].slice(index, 1);

        if (this.activeSubscriptions[subscriber.topic].length === 0) {
            this.activeSubscriptions[subscriber.topic] = undefined;
        }

        console.log('[SubscriptionsController] Removed subscriber ' + subscriber.name + ' from topic ' + subscriber.topic);
    }
}