function DashboardController()
{
}

DashboardController.prototype.init = function ()
{
    app.MapWidget.init();

    setInterval(function () {
        app.MapWidget.refresh();
    }, 2000)
};