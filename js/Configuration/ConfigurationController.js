function ConfigurationController()
{
    /**
     * @type {WidgetConfigurationRepository}
     */
    this.widgets = undefined;

    /**
     * @type {NetworkConfigurationRepository}
     */
    this.network = undefined;

    this.init = function ()
    {
        this.widgets = new WidgetConfigurationRepository();
        this.widgets.init();

        this.network = new NetworkConfigurationRepository();
        this.network.init();
    }
}