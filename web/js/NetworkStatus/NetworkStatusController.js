function NetworkStatusController()
{

}

NetworkStatusController.prototype.fetch = function (callback)
{
    $.ajax({
        url: '/api/network-status',
        method: 'GET',
        success: function (data) {
            var networkStatus = new NetworkStatus(data.ipAddress, data.webSocketPort);
            callback(networkStatus);
        }
    });
};