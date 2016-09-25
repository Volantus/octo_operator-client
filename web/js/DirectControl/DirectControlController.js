function DirectControlController()
{
    this.connection = undefined;
}

DirectControlController.prototype.init = function ()
{
    app.activeController = this;

    app.NetworkStatusWidget.init();
    app.NetworkStatusWidget.setConnectionStatus('Connecting...', '#54c8ff');

    var connectionStatus = $('#connectionStatus');

    var networkStatus = app.NetworkStatusController.get(function (networkStatus) {
        app.DirectControlController.connection = new WebSocket('wss://[' + networkStatus.ipAddress + ']:' + networkStatus.port);

        app.DirectControlController.connection.onopen = function () {
            connectionStatus.html('Waiting for motor status ...');
            app.NetworkStatusWidget.setConnectionStatus('Connected successfully', 'greenyellow');
            app.DirectControlController.connection.send('Ping');
        };

        app.DirectControlController.connection.onerror = function (error) {
            connectionStatus.html('Connection failed!');
            app.NetworkStatusWidget.setConnectionStatus('Connection failed', 'red');
            console.log('WebSocket Error ' + error);
        };

        app.DirectControlController.connection.onmessage = function (e) {
            console.log('Server: ' + e.data);
        };
    });
};

DirectControlController.prototype.tearDown = function () {
    app.NetworkStatusWidget = new NetworkStatusWidget();
    this.connection.close();
};