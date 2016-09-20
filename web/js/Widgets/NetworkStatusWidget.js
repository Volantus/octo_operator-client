function NetworkStatusWidget()
{

}

NetworkStatusWidget.prototype.refresh = function (triggerButton) {
    triggerButton = $(triggerButton);
    var segment = $('#NetworkStatusWidget');
    triggerButton.addClass('loading');
    segment.addClass('loading');

    app.NetworkStatusController.fetch(function (networkStatus) {
        segment.find('.ipAddress').html(networkStatus.ipAddress);
        segment.find('.port').html(networkStatus.port);

        triggerButton.removeClass('loading');
        segment.removeClass('loading');
    })
};