function app()
{
    /**
     * @type {DashboardController}
     */
    this.DashboardController     = undefined;
    /**
     * @type {DirectControlController}
     */
    this.DirectControlController = undefined;

    /**
     * @type {GeoPositionController}
     */
    this.GeoPositionController   = undefined;
    /**
     * @type {NetworkStatusController}
     */
    this.NetworkStatusController = undefined;
    /**
     * @type {MotorStatusController}
     */
    this.MotorStatusController   = undefined;

    /**
     * @type {MapWidget}
     */
    this.MapWidget           = new MapWidget();

    /**
     * @type {NetworkStatusWidget}
     */
    this.NetworkStatusWidget = new NetworkStatusWidget();

    this.activeController = undefined;
}

app.start = function () {
    this.DashboardController     = new DashboardController();
    this.DirectControlController = new DirectControlController();

    this.GeoPositionController   = new GeoPositionController();
    this.NetworkStatusController = new NetworkStatusController();
    this.MotorStatusController   = new MotorStatusController();

    this.MapWidget           = new MapWidget();
    this.NetworkStatusWidget = new NetworkStatusWidget();

    this.activeController = undefined;
};

app.switchPage = function (button, url)
{
    if (this.activeController != undefined) {
        this.activeController.tearDown();
        this.activeController = undefined;
    }

    Pace.start();

    if (button != undefined) {
        button = $(button);
        button.find('.icon').addClass('loading');
        $('#sideMenu').find('.item').removeClass('active');
        button.addClass('active');
    }

    $('#content').load(url, function () {
        if (button != undefined) {
            button.find('.icon').removeClass('loading');
        }

        Pace.stop();
    });
};