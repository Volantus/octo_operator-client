function NetworkStatusRepository()
{
    this.currentStatus = undefined;

    /**
     * @param {function} callback
     */
    this.fetch = function (callback)
    {
        $.ajax({
            url: '/api/network-status',
            method: 'GET',
            success: function (data) {
                app.NetworkStatusRepository.currentStatus = new NetworkStatus(data.ipAddress, data.webSocketPort);
                callback(app.NetworkStatusRepository.currentStatus);
            }
        });
    };

    /**
     * @param {function} callback
     */
    this.get = function (callback)
    {
        if (this.currentStatus == undefined) {
            this.fetch(callback);
        } else {
            callback(this.currentStatus);
        }
    };
}