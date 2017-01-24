/**
 * @param {string} authenticationKey
 * @constructor
 */
function ConnectionController(authenticationKey)
{
    /**
     * @type {string}
     */
    this.authenticationKey = authenticationKey;

    /**
     * @type {Connection[]}
     */
    this.connections = {};

    /**
     * @type {Connection}
     */
    this.activeConnection = undefined;

    /**
     * @type {*}
     */
    this.topBar = undefined;

    /**
     * @type {string}
     */
    this.remoteAddress = '5.9.41.227';

    /**
     * @type {string}
     */
    this.localAddress = '192.168.1.104';

    /**
     * @type {IncomingMessageHandler}
     */
    this.messageHandler = new IncomingMessageHandler();

    /**
     * @type {{in: number, out: number}}
     */
    this.messageCounter = {
        in: 0,
        out: 0
    };

    /**
     * @type {*}
     */
    this.topBarMessagesOutCounter = undefined;

    /**
     * @type {*}
     */
    this.topBarMessagesInCounter = undefined;

    this.init = function ()
    {
        this.topBar = $('#topBarRightMenu');
        this.topBarMessagesOutCounter = $('#messagesOutCounter');
        this.topBarMessagesInCounter = $('#messagesInCounter');
        this.connect(Connection.roles.localRelayServer, 'ws://' + this.localAddress + ':9000');
        this.connect(Connection.roles.remoteRelayServer, 'ws://' + this.remoteAddress + ':17468');

        setInterval(function () {
            app.ConnectionController.refreshCounterBar();
        }, 1000);
    };

    /**
     * @param {string} role
     * @param {string} address
     */
    this.connect = function (role, address)
    {
        this.connections[role] = (new Connection(role, address));
    };

    this.determineActiveConnection = function()
    {
        var connectionBefore = this.activeConnection;

        if (this.connections[Connection.roles.localRelayServer].established) {
            this.activeConnection = this.connections[Connection.roles.localRelayServer];
        } else {
            this.activeConnection = this.connections[Connection.roles.remoteRelayServer];
        }

        this.refreshConnectionStatus();

        if (connectionBefore !== this.activeConnection) {
            app.SubscriptionController.connectionStatusChanged();
        }
    };

    this.refreshConnectionStatus = function ()
    {
        var controller = this;
        app.TemplateRepository.get('statusBar/connectionStatus', function (template) {
            var statusText = 'Not connected';
            var statusColor = 'red';
            var serverAddress = '-';

            if (controller.activeConnection !== undefined) {
                statusColor = controller.activeConnection.role === Connection.roles.localRelayServer ? 'olive' : 'orange';
                statusText = controller.activeConnection.role === Connection.roles.localRelayServer ? 'Directly connected' : 'Proxy connection';
                serverAddress = controller.activeConnection.role === Connection.roles.localRelayServer ? controller.localAddress : controller.remoteAddress;
            }

            var rendered = Mustache.render(template, {
                statusColor: statusColor,
                statusText: statusText,
                serverAddress: serverAddress
            });

            var connectionStatus = controller.topBar.find('.connection-status');
            connectionStatus.eq(0).remove();
            connectionStatus.eq(1).replaceWith(rendered);
        })
    };

    /**
     * @param {string} data
     */
    this.sendData = function (data)
    {
        this.activeConnection.socket.send(data);
        this.messageCounter.out++;
    };

    /**
     * @param {string} data
     */
    this.broadcast = function (data)
    {
        $.each(this.connections, function (i, connection) {
            if (connection.established) {
                connection.socket.send(data);
                app.ConnectionController.messageCounter.out++;
            }
        })
    };

    /**
     * @param {*} data
     */
    this.onMessage = function (data)
    {
        this.messageHandler.handle(JSON.parse(data.data));
        this.messageCounter.in++;
    };

    this.refreshCounterBar = function ()
    {
        this.topBarMessagesInCounter.html('<i class="download icon"></i>' + this.messageCounter.in);
        this.topBarMessagesOutCounter.html('<i class="upload icon"></i>' + this.messageCounter.out);
    }
}