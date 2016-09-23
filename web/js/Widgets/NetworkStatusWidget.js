function NetworkStatusWidget()
{
    this.segment = undefined;
}

NetworkStatusWidget.prototype.init = function ()
{
    this.segment = $('#NetworkStatusWidget');
};

NetworkStatusWidget.prototype.refresh = function (triggerButton) {
    triggerButton = $(triggerButton);
    var segment = $('#NetworkStatusWidget');
    this.segment = segment;
    triggerButton.addClass('loading');
    segment.addClass('loading');

    app.NetworkStatusController.fetch(function (networkStatus) {
        segment.find('.ipAddress').html(networkStatus.ipAddress);
        segment.find('.port').html(networkStatus.port);

        triggerButton.removeClass('loading');
        segment.removeClass('loading');
    })
};

NetworkStatusWidget.prototype.setConnectionStatus = function (text, color)
{
    this.segment.find('.status').html('<div style="color: ' + color + '">' + text + '</div>');
};