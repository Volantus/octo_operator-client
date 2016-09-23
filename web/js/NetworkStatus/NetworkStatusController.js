function NetworkStatusController()
{
    this.currentStatus = undefined
}

NetworkStatusController.prototype.fetch = function (callback)
{
    $.ajax({
        url: '/api/network-status',
        method: 'GET',
        success: function (data) {
            this.currentStatus = new NetworkStatus(data.ipAddress, data.webSocketPort);
            callback(this.currentStatus);
        }
    });
};

NetworkStatusController.prototype.get = function (callback)
{
    if (this.currentStatus == undefined) {
        this.fetch(callback);
    } else {
        callback(this.currentStatus);
    }
};