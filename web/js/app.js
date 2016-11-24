function app()
{
    /**
     * @type {WidgetController}
     */
    this.WidgetController = undefined;
}

app.start = function () {
    this.WidgetController = new WidgetController();
    this.WidgetController.init();
};