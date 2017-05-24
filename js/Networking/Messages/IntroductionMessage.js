/**
 * @param {number} role
 * @constructor
 */
function IntroductionMessage(role)
{
    AbstractMessage.call(this);

    /**
     * @type {string}
     */
    this.title = 'Introduction';

    /**
     * @type {string}
     */
    this.type = 'introduction';
    
    /**
     *
     * @type {Object}
     */
    this.data = {
        role: role
    };
}