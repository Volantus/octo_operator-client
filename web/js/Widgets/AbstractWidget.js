function AbstractWidget()
{
    /**
     * @type {boolean}
     */
    this.active = false;

    /**
     * @type {string}
     */
    this.templateId = undefined;

    /**
     * @type {string}
     */
    this.template = undefined;

    this.init = function ()
    {
        this.active = true;
    };

    this.tearDown = function ()
    {
        this.active = false;
    };

    this.loadTemplate = function ()
    {
        var widget = this;
        $.get('/templates/' + this.templateId + ".html", function (template) {
            widget.template = template;
        })
    };

    this.show = function ()
    {
        $('#ContentGrid').append(this.template);
    }
}