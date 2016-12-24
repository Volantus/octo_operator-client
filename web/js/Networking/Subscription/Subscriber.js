/**
 * @param {string} topic
 * @param {number} offset
 * @param {string} name
 * @param {function} callback
 * @constructor
 */
function Subscriber(topic, offset, name, callback)
{
    /**
     * @type {number}
     */
    this.defaultOffset = offset;

    /**
     * @type {string}
     */
    this.currentMessageId = undefined;

    /**
     * @type {string}
     */
    this.topic = topic;

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {Function}
     */
    this.callback = callback;

    /**
     * @param {SubscriptionMessage} message
     */
    this.handle = function (message)
    {
        this.currentMessageId = message.id;
        this.callback(message);
    };

    this.register = function ()
    {
        app.SubscriptionController.subscribe(this);
    };

    this.unregister = function ()
    {
        app.SubscriptionController.unsubscribe(this);
    }
}