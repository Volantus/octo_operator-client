function DirectControlController()
{
    /**
     * @type {WebSocket}
     */
    this.connection             = undefined;

    /**
     * @type {IncomingMessageHandler}
     */
    this.incomingMessageHandler = undefined;

    /**
     * @type {Object}
     */
    this.connectionStatus = undefined;
}

DirectControlController.prototype.init = function ()
{
    app.activeController = this;

    app.NetworkStatusWidget.init();
    app.NetworkStatusWidget.setConnectionStatus('Connecting...', '#54c8ff');

    this.connectionStatus       = $('#connectionStatus');
    this.incomingMessageHandler = new IncomingMessageHandler();

    app.NetworkStatusController.get(function (networkStatus) {
        var ipAddress = networkStatus.ipAddress.indexOf(':') !== -1 ? ('[' + networkStatus.ipAddress + ']') : networkStatus.ipAddress;
        app.DirectControlController.createWebSocket(ipAddress, networkStatus.port);
    });
};

/**
 * @param {string} ipAddress
 * @param {int} port
 */
DirectControlController.prototype.createWebSocket = function(ipAddress, port)
{
    var socket           = new WebSocket('wss://' + ipAddress + ':' + port);
    var connectionStatus = this.connectionStatus;
    var messageHandler   = this.incomingMessageHandler;

    socket.onopen = function () {
        connectionStatus.html('Waiting for motor status ...');
        app.NetworkStatusWidget.setConnectionStatus('Connected successfully', 'greenyellow');
    };

    socket.onerror = function (error) {
        connectionStatus.html('Connection failed!');
        app.NetworkStatusWidget.setConnectionStatus('Connection failed', 'red');
        console.log('WebSocket Error ' + error);
    };

    socket.onmessage = function (e) {
        messageHandler.handle(JSON.parse(e.data));
    };

    this.connection = socket;
};

DirectControlController.prototype.tearDown = function () {
    app.NetworkStatusWidget = new NetworkStatusWidget();

    if (this.connection != undefined) {
        this.connection.close();
    }

    this.incomingMessageHandler = undefined;
    this.connectionStatus = undefined;
};