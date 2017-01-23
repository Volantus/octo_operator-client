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
    this.localAddress = '192.168.1.102';

    /**
     * @type {IncomingMessageHandler}
     */
    this.messageHandler = new IncomingMessageHandler();

    this.init = function ()
    {
        this.topBar = $('#topBarRightMenu');
        this.connect(Connection.roles.localRelayServer, 'ws://' + this.localAddress + ':9000');
        this.connect(Connection.roles.remoteRelayServer, 'ws://' + this.remoteAddress + ':17468');
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
    };

    /**
     * @param {*} data
     */
    this.onMessage = function (data)
    {
        this.messageHandler.handle(JSON.parse(data.data));
    };
}