/**
 * @param {string} role
 * @param {string }address
 * @constructor
 */
function Connection(role, address)
{
    /**
     * @type {string}
     */
    this.role = role;

    /**
     * @type {boolean}
     */
    this.established = false;

    /**
     * @type {WebSocket}
     */
    this.socket = new WebSocket(address);

    this.socket.onopen = function ()
    {
        console.log ('[Connection] Connection ' + role + ' established successfully!');

        var socket = app.ConnectionController.connections[role].socket;
        socket.send(JSON.stringify(new AuthenticationMessage(app.ConnectionController.authenticationKey)));
        socket.send(JSON.stringify(new IntroductionMessage(1)));

        app.ConnectionController.connections[role].established = true;
        app.ConnectionController.determineActiveConnection();
    };

    this.socket.onclose = function ()
    {
        app.ConnectionController.connections[role].handleError();
    };

    this.socket.onmessage = function (e)
    {

    };

    this.handleError = function ()
    {
        console.log ('[Connection] Connection ' + role + ' closed');

        app.ConnectionController.connections[role].established = false;
        app.ConnectionController.determineActiveConnection();
        setTimeout(function () {
            app.ConnectionController.connect(role, address);
        }, 1000);
    };

    this.checkInterval = setInterval(function () {
        var connection = app.ConnectionController.connections[role];

        if (!connection.established) {
            clearInterval(connection.checkInterval);

            connection.socket.onclose = undefined;
            connection.socket.onerror = undefined;
            connection.socket.onmessage = undefined;
            connection.socket.onopen = function () {
                connection.socket.close();
            };

            connection.handleError();
        }
    }, 2000)
}

/**
 * @type {{localRelayServer: string, remoteRelayServer: string}}
 */
Connection.roles = {
    localRelayServer: 'localRelayServer',
    remoteRelayServer: 'remoteRelayServer'
};