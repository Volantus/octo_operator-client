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
    this.connection = new WebSocket(address);

    this.connection.onopen = function ()
    {
        console.log ('[Connection] Connection ' + role + ' established successfully!');

        app.ConnectionController.connections[role].established = true;
        app.ConnectionController.determineActiveConnection();
    };

    this.connection.onclose = function ()
    {
        app.ConnectionController.connections[role].handleError();
    };

    this.connection.onmessage = function (e)
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

            connection.connection.onclose = undefined;
            connection.connection.onerror = undefined;
            connection.connection.onmessage = undefined;
            connection.connection.onopen = function () {
                connection.connection.close();
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