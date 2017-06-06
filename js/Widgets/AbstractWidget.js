function AbstractWidget()
{
    /**
     * @type {string}
     */
    this.id = 'undefinedWidgetId';

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
    this.segmentId = 'MapWidget';

    /**
     * @type {string}
     */
    this.template = undefined;

    /**
     * @type {object}
     */
    this.segment = undefined;

    this.init = function ()
    {
        this.active = true;
    };

    this.tearDown = function ()
    {
        this.active = false;
        app.WidgetController.onTearDown(this);
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
        this.segment = $('#' + this.segmentId);
    }
}