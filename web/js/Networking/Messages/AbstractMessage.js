/**
 * @param {string} type
 * @param {string} title
 * @param {Object} data
 * @constructor
 */
function AbstractMessage(type, title, data)
{
    /**
     * @type {number}
     */
    this.id = MessageSequence.nextValue();

    /**
     * @type {string}
     */
    this.title = title;

    /**
     * @type {string}
     */
    this.type = type;

    /**
     *
     * @type {Object}
     */
    this.data = data;
}