function app()
{
    /**
     * @type {TemplateRepository}
     */
    this.TemplateRepository = undefined;

    /**
     * @type {ConfigurationController}
     */
    this.ConfigurationController = undefined;

    /**
     * @type {FooterBarController}
     */
    this.FooterBarController = undefined;

    /**
     * @type {GamepadController}
     */
    this.GamepadController = undefined;

    /**
     * @type {WidgetController}
     */
    this.WidgetController = undefined;

    /**
     * @type {SubscriptionsController}
     */
    this.SubscriptionController = undefined;

    /**
     * @type {ConnectionController}
     */
    this.ConnectionController = undefined;
}

app.start = function ()
{
    this.GamepadController = new GamepadController();
    this.GamepadController.init();

    this.TemplateRepository = new TemplateRepository();
    this.TemplateRepository.init();

    this.ConfigurationController = new ConfigurationController();
    this.ConfigurationController.init();

    this.FooterBarController = new FooterBarController();
    this.FooterBarController.init();

    this.WidgetController = new WidgetController();
    this.WidgetController.init();

    this.SubscriptionController = new SubscriptionsController();

    this.ConnectionController = new ConnectionController();
    this.ConnectionController.init();
};