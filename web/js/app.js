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
     * @type {GeoPositionRepository}
     */
    this.GeoPositionRepository   = undefined;

    /**
     * @type {NetworkStatusRepository}
     */
    this.NetworkStatusRepository = undefined;

    /**
     * @type {MotorStatusRepository}
     */
    this.MotorStatusRepository   = undefined;

    /**
     * @type {MapWidget}
     */
    this.MapWidget           = undefined;

    /**
     * @type {NetworkStatusWidget}
     */
    this.NetworkStatusWidget = undefined;

    /**
     * @type {MotorStatusHistoryWidget}
     */
    this.MotorStatusHistoryWidget = undefined;

    /**
     * @type {AbstractController}
     */
    this.activeController = undefined;
}

app.start = function () {
    this.DashboardController     = new DashboardController();
    this.DirectControlController = new DirectControlController();

    this.GeoPositionRepository   = new GeoPositionRepository();
    this.NetworkStatusRepository = new NetworkStatusRepository();
    this.MotorStatusRepository   = new MotorStatusRepository();

    this.MapWidget                = new MapWidget();
    this.NetworkStatusWidget      = new NetworkStatusWidget();
    this.MotorStatusHistoryWidget = new MotorStatusHistoryWidget();

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