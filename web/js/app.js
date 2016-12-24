function app()
{
    /**
     * @type {WidgetController}
     */
    this.WidgetController = undefined;

    /**
     * @type {SubscriptionsController}
     */
    this.SubscriptionController = undefined;
}

app.start = function () {
    this.WidgetController = new WidgetController();
    this.WidgetController.init();

    this.SubscriptionController = new SubscriptionsController();
};