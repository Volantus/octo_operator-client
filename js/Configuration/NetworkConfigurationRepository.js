function NetworkConfigurationRepository()
{
    this.init = function ()
    {
        if (this.getAuthToken() === null) {
            this.setAuthToken('undefinedToken');
        }

        if (this.getRelayServerA() === null) {
            this.setRelayServerA('127.0.0.1:5001');
        }

        if (this.getRelayServerB() === null) {
            this.setRelayServerB('127.0.0.1:5002');
        }
    };

    /**
     * @return {string|null}
     */
    this.getAuthToken = function()
    {
        return LocalConfigStorage.getItem('networkAuthToken');
    };

    /**
     * @param {string} token
     */
    this.setAuthToken = function (token)
    {
        LocalConfigStorage.setItem('networkAuthToken', token);
    };

    /**
     * @return {string|null}
     */
    this.getRelayServerA = function()
    {
        return LocalConfigStorage.getItem('relayServerA');
    };

    /**
     * @param {string} address
     */
    this.setRelayServerA = function (address)
    {
        LocalConfigStorage.setItem('relayServerB', address);
    };

    /**
     * @return {string|null}
     */
    this.getRelayServerB = function()
    {
        return LocalConfigStorage.getItem('relayServerB');
    };

    /**
     * @param {string} address
     */
    this.setRelayServerB = function (address)
    {
        LocalConfigStorage.setItem('relayServerB', address);
    }
}