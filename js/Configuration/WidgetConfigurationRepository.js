function WidgetConfigurationRepository()
{
    this.init = function ()
    {
        if (this.getAvailable() === null) {
            LocalConfigStorage.setItem('availableWidgetConfigurations', []);
        }
    };

    /**
     * @return {array}
     */
    this.getAvailable = function ()
    {
        return LocalConfigStorage.getItem('availableWidgetConfigurations');
    };

    /**
     * @param {string} name
     * @return {WidgetConfiguration}
     */
    this.getByName = function (name)
    {
        var data = LocalConfigStorage.getItem('widgetConfiguration-' + name);
        return new WidgetConfiguration(name, data);
    };

    /**
     * @param {WidgetConfiguration} widgetConfig
     */
    this.save = function (widgetConfig)
    {
        LocalConfigStorage.setItem('widgetConfiguration-' + widgetConfig.name, widgetConfig.widgetsIds);

        var availableNames = this.getAvailable();
        if (availableNames.indexOf(widgetConfig.name) === -1) {
            availableNames.push(widgetConfig.name);
            LocalConfigStorage.setItem('availableWidgetConfigurations', availableNames);
        }
    }
}