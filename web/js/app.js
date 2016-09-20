function Application()
{
    this.DashboardController   = new DashboardController();
    this.GeoPositionController = new GeoPositionController();
    this.NetworkStatusController = new NetworkStatusController();

    this.MapWidget = new MapWidget();
    this.NetworkStatusWidget = new NetworkStatusWidget();
}

Application.prototype.switchPage = function (button, url)
{
    Pace.start();
    button = $(button);
    button.find('.icon').addClass('loading');
    $('#sideMenu').find('.item').removeClass('active');
    button.addClass('active');

    $('#content').load(url + ' #content', function () {
        button.find('.icon').removeClass('loading');
        Pace.stop();
    });
};