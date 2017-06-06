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

    /**
     * @type {WidgetConfiguration}
     */
    this.currentConfig = new WidgetConfiguration('Unnamed', []);

    this.init = function ()
    {
        this.widgets[MapWidget.id] = new MapWidget();
        this.widgets[MapWidget.id].loadTemplate();

        this.widgets[AbsoluteAltitudeWidget.id] = new AbsoluteAltitudeWidget();
        this.widgets[AbsoluteAltitudeWidget.id].loadTemplate();

        this.widgets[RelativeAltitudeWidget.id] = new RelativeAltitudeWidget();
        this.widgets[RelativeAltitudeWidget.id].loadTemplate();

        this.widgets[ClimbRateWidget.id] = new ClimbRateWidget();
        this.widgets[ClimbRateWidget.id].loadTemplate();

        this.widgets[AltitudeHistoryWidget.id] = new AltitudeHistoryWidget();
        this.widgets[AltitudeHistoryWidget.id].loadTemplate();

        this.widgets[AttitudeWidget.id] = new AttitudeWidget();
        this.widgets[AttitudeWidget.id].loadTemplate();

        this.widgets[HeadingWidget.id] = new HeadingWidget();
        this.widgets[HeadingWidget.id].loadTemplate();

        this.widgets[CurrentMotorStatusWidget.id] = new CurrentMotorStatusWidget();
        this.widgets[CurrentMotorStatusWidget.id].loadTemplate();

        this.widgets[MotorStatusRadarWidget.id] = new MotorStatusRadarWidget();
        this.widgets[MotorStatusRadarWidget.id].loadTemplate();

        this.widgets[MotorStatusHistoryWidget.id] = new MotorStatusHistoryWidget();
        this.widgets[MotorStatusHistoryWidget.id].loadTemplate();

        this.widgets[ManualControlWidget.id] = new ManualControlWidget();
        this.widgets[ManualControlWidget.id].loadTemplate();

        this.widgets[PidFrequencyWidget.id] = new PidFrequencyWidget();
        this.widgets[PidFrequencyWidget.id].loadTemplate();

        this.widgets[PidTuningStatusWidget.id] = new PidTuningStatusWidget();
        this.widgets[PidTuningStatusWidget.id].loadTemplate();

        this.selectionDropdown = $('.instrument-selection');
        this.selectionDropdown.dropdown({
            onChange: function (widgetId) {
                var widget = app.WidgetController.widgets[widgetId];

                if (!widget.active) {
                    console.log('[WidgetController] Initializing ' + widgetId + ' widget ...');
                    widget.show();
                    widget.init();
                    widget.active = true;
                    app.WidgetController.currentConfig.add(widgetId);
                    console.log('[WidgetController] Finished initializing ' + widgetId + ' widget!');
                }
            }
        });
    };

    /**
     * @param {AbstractWidget} widget
     */
    this.onTearDown = function (widget)
    {
        this.currentConfig.remove(widget.id);
    }
}