function DashboardController()
{
    this.geoPositionSegment = $('#GeoPositionMap');
}

DashboardController.prototype.init = function ()
{
    app.MapController.render('GeoPositionMap');
    this.updateGeoPositionMap();
    this.geoPositionSegment.removeClass('loading');

    setInterval(function () {
        app.DashboardController.updateGeoPositionMap();
    }, 2000)
};

DashboardController.prototype.updateGeoPositionMap = function ()
{
    app.GeoPositionController.getAllPositions(function (positions) {
        if (positions.length > 0) {
            app.MapController.setCurrentPosition(positions.pop());
        }

        if (positions.length > 0) {
            app.MapController.setPreviousPositions(positions);
        }
    });
};