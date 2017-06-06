function ConfigurationController()
{
    /**
     * @type {WidgetConfigurationRepository}
     */
    this.widgets = undefined;

    this.init = function ()
    {
        this.widgets = new WidgetConfigurationRepository();
    }
}