function RequestTopicStatusMessage()
{
    AbstractMessage.call(this);

    /**
     * @type {string}
     */
    this.title = 'Request topic status';

    /**
     * @type {string}
     */
    this.type = 'requestTopicStatus';

    /**
     *
     * @type {Object}
     */
    this.data = [];
}