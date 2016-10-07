function NetworkStatusWidget()
{
    AbstractWidget.call(this);
    
    this.segment = undefined;

    this.init = function ()
    {
        this.segment = $('#NetworkStatusWidget');
    };

    /**
     * @param {Object} triggerButton
     */
    this.refresh = function (triggerButton) {
        triggerButton = $(triggerButton);
        var segment = $('#NetworkStatusWidget');
        this.segment = segment;
        triggerButton.addClass('loading');
        segment.addClass('loading');

        app.NetworkStatusRepository.fetch(function (networkStatus) {
            segment.find('.ipAddress').html(networkStatus.ipAddress);
            segment.find('.port').html(networkStatus.port);

            triggerButton.removeClass('loading');
            segment.removeClass('loading');
        })
    };

    /**
     * @param {string} text
     * @param {string} color
     */
    this.setConnectionStatus = function (text, color)
    {
        this.segment.find('.status').html('<div style="color: ' + color + '">' + text + '</div>');
    };
}