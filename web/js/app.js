function Application()
{
    this.DashboardController   = new DashboardController();
    this.GeoPositionController = new GeoPositionController();
    this.NetworkStatusController = new NetworkStatusController();

    this.MapWidget = new MapWidget();
    this.NetworkStatusWidget = new NetworkStatusWidget();
}