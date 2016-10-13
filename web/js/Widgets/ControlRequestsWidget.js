function ControlRequestsWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {string}
     */
    this.template = undefined;

    /**
     * @type {Object}
     */
    this.segment = undefined;

    this.init = function ()
    {
        $.get("/templates/controlRequest.html", function (data) {
            app.ControlRequestsWidget.template = data;
        });
        this.segment = $('#ControlRequestsWidget');
    };

    /**
     * @param {AbstractMessage} message
     */
    this.messageSent = function (message)
    {
        var parameters = {
            id: 'ControlRequestItem-' + message.id,
            title: message.title,
            description: 'Sending... [' + message.id + ']',
            running: true
        };

        var list = this.segment.find('.segment .list');
        list.html(Mustache.render(this.template, parameters) + list.html());
    };

    /**
     * @param {AcknowledgeMessage} acknowledge
     */
    this.acknowledgeReceived = function (acknowledge)
    {
        var element = $('#ControlRequestItem-' + acknowledge.messageId);
        var parameters = {
            id: element.id,
            title: element.find('.header').html(),
            description: 'Successful - ' + acknowledge.latency  + ' ms [' + acknowledge.messageId + ']',
            running: false,
            statusIcon: acknowledge.status == 'success' ? 'green checkmark' : 'red remove'
        };

        var rendered = Mustache.render(this.template, parameters);
        element.replaceWith(rendered);
    }
}