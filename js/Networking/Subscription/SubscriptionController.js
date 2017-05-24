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
        if (this.activeSubscriptions[subscriber.topic.name] === undefined) {
            this.activeSubscriptions[subscriber.topic.name] = [];
        }

        this.activeSubscriptions[subscriber.topic.name].push(subscriber);
        this.refreshSubscriptions();

        console.log('[SubscriptionsController] Added subscriber ' + subscriber.name + ' to topic ' + subscriber.topic.name);
    };

    /**
     * @param {Subscriber} subscriber
     */
    this.unsubscribe = function (subscriber)
    {
        var index = this.activeSubscriptions[subscriber.topic.name].indexOf(subscriber);
        this.activeSubscriptions[subscriber.topic.name].slice(index, 1);

        if (this.activeSubscriptions[subscriber.topic.name].length === 0) {
            this.activeSubscriptions[subscriber.topic.name] = undefined;
        }
        this.refreshSubscriptions();

        console.log('[SubscriptionsController] Removed subscriber ' + subscriber.name + ' from topic ' + subscriber.topic.name);
    };

    this.connectionStatusChanged = function ()
    {
        app.ConnectionController.broadcast(JSON.stringify(new SubscriptionStatusMessage([])));
        $.each(app.SubscriptionController.activeSubscriptions, function (topicName, subscriptionGroup) {
            $.each(subscriptionGroup, function (a, subscription) {
                subscription.defaultOffset = 1;
                subscription.provisioned = false;
            })
        });
        app.SubscriptionController.refreshSubscriptions();
    };

    this.refreshSubscriptions = function ()
    {
        app.ConnectionController.sendData(JSON.stringify(new RequestTopicStatusMessage()));
    };

    /**
     * @param {TopicStatus[]} status
     */
    this.onNewTopicStatus = function (status)
    {
        this.updateRevisions(status);
        this.sendSubscriptionStatus();
    };

    /**
     * @param {TopicStatus[]} status
     */
    this.updateRevisions = function (status)
    {
        var controller = app.SubscriptionController;

        $.each(status, function (i, topicStatus) {
            $.each(controller.activeSubscriptions, function (topicName, subscriptionGroup) {
                if (topicName === topicStatus.name) {

                    $.each(subscriptionGroup, function (a, subscription) {
                        if (!subscription.provisioned) {
                            subscription.provisioned = true;
                            subscription.topic.revision = topicStatus.revision - subscription.defaultOffset;
                        }
                    })
                }
            });
        });
    };

    this.sendSubscriptionStatus = function ()
    {
        var status = [];

        $.each(this.activeSubscriptions, function (topicName, subscriptionGroup) {
            var topicStatus = subscriptionGroup[0].topic;

            $.each(subscriptionGroup, function (i, subscription) {
                if (subscription.topic.revision < topicStatus.revision) {
                    topicStatus = subscription.topic;
                }
            });

            status.push(topicStatus);
        });

        app.ConnectionController.sendData(JSON.stringify(new SubscriptionStatusMessage(status)));
    };

    /**
     * @param {AbstractTopicMessage|GeoPosition} message
     */
    this.distributeTopicContainer = function (message)
    {
        if (this.activeSubscriptions[message.topic.name] !== undefined) {
            $.each(this.activeSubscriptions[message.topic.name], function (i, subscriber) {
                if (subscriber.topic.revision < message.topic.revision) {
                    subscriber.handle(message);
                }
            })
        }
    }
}