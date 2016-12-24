function AbstractWidget()
{
    /**
     * @type {boolean}
     */
    this.active = false;

    this.init = function ()
    {
        this.active = true;
    };

    this.tearDown = function ()
    {
        this.active = false;
    };
}