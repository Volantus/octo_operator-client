function SubscriptionsController()
{
    /**
     * @type {Array}
     */
    this.activeSubscriptions = {};

    /**
     * @param {AbstractSubscriber} subscriber
     */
    this.subscribe = function (subscriber)
    {
        if (this.activeSubscriptions[subscriber.topic] == undefined) {
            this.activeSubscriptions[subscriber.topic] = [];
        }

        this.activeSubscriptions[subscriber.topic].push(subscriber);

        console.log('[SubscriptionsController] Added subscriber ' + subscriber.name + ' to topic ' + subscriber.topic);
    };

    /**
     * @param {AbstractSubscriber} subscriber
     */
    this.unsubscribe = function (subscriber)
    {
        var index = this.activeSubscriptions[topic].indexOf(widget);
        this.activeSubscriptions[topic].slice(index, 1);

        if (this.activeSubscriptions[topic].length == 0) {
            this.activeSubscriptions[topic] = undefined;
        }

        console.log('[SubscriptionsController] Removed subscriber ' + subscriber.name + ' from topic ' + subscriber.topic);
    }
}