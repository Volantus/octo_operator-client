function DashboardController()
{
    AbstractController.call(this);

    this.lastUpdateHeader = $('#dashBoardLastUpdateHeader');
    this.lastUpdate = new Date();

    this.lastUpdateTimer = undefined;
    this.refreshTimer = undefined;

    this.init = function ()
    {
        app.activeController = this;
        app.MapWidget.init();

        this.lastUpdateTimer = setInterval(function () {
            app.DashboardController.updateLastUpdateHeader();
        }, 500);

        this.refreshTimer = setInterval(function () {
            app.MapWidget.refresh(function () {
                app.DashboardController.lastUpdate = new Date();
                app.DashboardController.lastUpdateHeader.html('Last update: ' + 0 + ' seconds ago');
            });
        }, 3000);
    };

    this.tearDown = function ()
    {
        clearInterval(this.lastUpdateTimer);
        clearInterval(this.refreshTimer);

        app.MapWidget = new MapWidget();
    };

    this.updateLastUpdateHeader = function ()
    {
        var difference = (new Date().getTime() - this.lastUpdate.getTime()) / 1000;
        this.lastUpdateHeader.html('Last update: ' + difference.toFixed(0) + ' seconds ago');
    };
}