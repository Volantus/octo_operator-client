function WidgetController()
{
    /**
     * @type {Object}
     */
    this.selectionDropdown = undefined;

    /**
     * @type {Array}
     */
    this.widgets = {};

    this.init = function ()
    {
        this.widgets[MapWidget.id] = new MapWidget();
        this.widgets[MapWidget.id].loadTemplate();

        this.widgets[AbsoluteAltitudeWidget.id] = new AbsoluteAltitudeWidget();
        this.widgets[AbsoluteAltitudeWidget.id].loadTemplate();

        this.widgets[RelativeAltitudeWidget.id] = new RelativeAltitudeWidget();
        this.widgets[RelativeAltitudeWidget.id].loadTemplate();

        this.widgets[AltitudeHistoryWidget.id] = new AltitudeHistoryWidget();
        this.widgets[AltitudeHistoryWidget.id].loadTemplate();

        this.selectionDropdown = $('#WidgetSelectionDropdown');
        this.selectionDropdown.dropdown({
            onChange: function (widgetId) {
                var widget = app.WidgetController.widgets[widgetId];

                if (!widget.active) {
                    console.log('[WidgetController] Initializing ' + widgetId + ' widget ...');
                    widget.show();
                    widget.init();
                    widget.active = true;
                    console.log('[WidgetController] Finished initializing ' + widgetId + ' widget!');
                }
            }
        });
    }
}