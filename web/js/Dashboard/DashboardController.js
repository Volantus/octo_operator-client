function DashboardController()
{
    this.lastUpdateHeader = $('#dashBoardLastUpdateHeader');
    this.lastUpdate = new Date();
}

DashboardController.prototype.init = function ()
{
    app.MapWidget.init();

    setInterval(function () {
        app.DashboardController.updateLastUpdateHeader();
    }, 500);

    setInterval(function () {
        app.MapWidget.refresh(function () {
            app.DashboardController.lastUpdate = new Date();
            app.DashboardController.lastUpdateHeader.html('Last update: ' + 0 + ' seconds ago');
        });
    }, 3000);
};

DashboardController.prototype.updateLastUpdateHeader = function ()
{
    var difference = (new Date().getTime() - this.lastUpdate.getTime()) / 1000;
    this.lastUpdateHeader.html('Last update: ' + difference.toFixed(0) + ' seconds ago');
};