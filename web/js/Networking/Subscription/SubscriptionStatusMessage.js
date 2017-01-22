/**
 * @param {TopicStatus[]} status
 * @constructor
 */
function SubscriptionStatusMessage(status)
{
    AbstractMessage.call(this);

    /**
     * @type {string}
     */
    this.title = 'Subscription status message';

    /**
     * @type {string}
     */
    this.type = 'subscriptionStatusMessage';

    /**
     * @type {Object}
     */
    this.data = {
        status: status
    };
}