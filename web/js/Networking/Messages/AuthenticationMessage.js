/**
 * @param {string} token
 * @constructor
 */
function AuthenticationMessage(token)
{
    AbstractMessage.call(this);

    /**
     * @type {string}
     */
    this.title = 'Authentication';

    /**
     * @type {string}
     */
    this.type = 'authentication';

    /**
     *
     * @type {Object}
     */
    this.data = {
        token: token
    };
}