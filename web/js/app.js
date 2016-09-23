function Application()
{
    this.DashboardController   = new DashboardController();
    this.GeoPositionController = new GeoPositionController();
    this.NetworkStatusController = new NetworkStatusController();

    this.MapWidget = new MapWidget();
    this.NetworkStatusWidget = new NetworkStatusWidget();

    this.activeController = undefined;
}

Application.prototype.switchPage = function (button, url)
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