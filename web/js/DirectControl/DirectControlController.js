function DirectControlController()
{
    AbstractController.call(this);
    MotorStatusListener.call(this);

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

    this.init = function ()
    {
        app.activeController = this;
        app.MotorStatusRepository.addListener(this);

        app.DirectControlWidget.init();
        app.NetworkStatusWidget.init();
        app.NetworkStatusWidget.setConnectionStatus('Connecting...', '#54c8ff');

        this.connectionStatus       = $('#connectionStatus');
        this.incomingMessageHandler = new IncomingMessageHandler();

        app.NetworkStatusRepository.get(function (networkStatus) {
            var ipAddress = networkStatus.ipAddress.indexOf(':') !== -1 ? ('[' + networkStatus.ipAddress + ']') : networkStatus.ipAddress;
            app.DirectControlController.createWebSocket(ipAddress, networkStatus.port);
        });

        app.MotorStatusHistoryWidget.init();
    };

    /**
     * @param {string} ipAddress
     * @param {int} port
     */
    this.createWebSocket = function(ipAddress, port)
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
    /**
     * @param {MotorStatusCollection} motorStatus
     */
    this.newMotorStatus = function (motorStatus)
    {
        app.DirectControlWidget.enableAllButtons();
        this.connectionStatus.html('Ready to fly!');
        app.MotorStatusRepository.removeListener(this);
    };

    /**
     * @param {Object} message
     */
    this.sendMessage = function (message)
    {
        this.connection.send(JSON.stringify(message));
    };

    this.tearDown = function () {
        app.MotorStatusRepository.removeListener(this);
        app.NetworkStatusWidget.tearDown();
        app.NetworkStatusWidget = new NetworkStatusWidget();
        app.MotorStatusHistoryWidget.tearDown();
        app.MotorStatusHistoryWidget = new MotorStatusHistoryWidget();
        app.DirectControlWidget.tearDown();

        if (this.connection != undefined) {
            this.connection.close();
        }

        this.incomingMessageHandler = undefined;
        this.connectionStatus = undefined;
    };
}