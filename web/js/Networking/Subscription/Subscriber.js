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
     * @type {TopicStatus}
     */
    this.topic = new TopicStatus(topic, 0);

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {Function}
     */
    this.callback = callback;

    /**
     * @type {boolean}
     */
    this.provisioned = false;

    /**
     * @param {SubscriptionMessage} message
     */
    this.handle = function (message)
    {
        this.currentRevision = message.id;
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