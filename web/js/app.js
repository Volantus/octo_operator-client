function app()
{
    /**
     * @type {TemplateRepository}
     */
    this.TemplateRepository = undefined;

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

/**
 * @param {string} authenticationKey
 */
app.start = function (authenticationKey) {
    this.TemplateRepository = new TemplateRepository();
    this.TemplateRepository.init();

    this.WidgetController = new WidgetController();
    this.WidgetController.init();

    this.SubscriptionController = new SubscriptionsController();

    this.ConnectionController = new ConnectionController(authenticationKey);
    this.ConnectionController.init();
};