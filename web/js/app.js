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

app.start = function () {
    this.TemplateRepository = new TemplateRepository();
    this.TemplateRepository.init();

    this.WidgetController = new WidgetController();
    this.WidgetController.init();

    this.SubscriptionController = new SubscriptionsController();

    this.ConnectionController = new ConnectionController();
    this.ConnectionController.init();
};