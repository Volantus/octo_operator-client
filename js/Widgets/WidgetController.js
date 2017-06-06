function WidgetController()
{
    /**
     * @type {Object}
     */
    this.selectionDropdown = undefined;

    /**
     * @type {Object}
     */
    this.saveScreenDropdown = undefined;

    /**
     * @type {Object}
     */
    this.footerBar = undefined;

    /**
     * @type {Array}
     */
    this.widgets = {};

    /**
     * @type {WidgetConfiguration}
     */
    this.draftConfig = new WidgetConfiguration('Unnamed', []);

    /**
     * @type {string}
     */
    this.activeScreenName = 'Individual draft';

    /**
     * @type {boolean}
     */
    this.draftActive = true;

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
                app.WidgetController.showWidget(widgetId);
            }
        });

        this.footerBar = $('#fixedFooter');
        this.renderScreenMenu('Individual draft');
    };

    /**
     * @param {string} widgetId
     */
    this.showWidget = function (widgetId)
    {
        var widget = app.WidgetController.widgets[widgetId];

        if (!widget.active) {
            console.log('[WidgetController] Initializing ' + widgetId + ' widget ...');
            widget.show();
            widget.init();
            widget.active = true;

            if (app.WidgetController.draftActive) {
                app.WidgetController.draftConfig.add(widgetId);
            } else {
                var widgetConfig = app.ConfigurationController.widgets.getByName(app.WidgetController.activeScreenName);
                widgetConfig.add(widgetId);
                app.ConfigurationController.widgets.save(widgetConfig);
            }

            console.log('[WidgetController] Finished initializing ' + widgetId + ' widget!');
        }
    };

    this.saveCurrentScreen = function ()
    {
        var screenName = $('#screenNameInput').val();
        this.draftConfig.name = screenName;
        app.ConfigurationController.widgets.save(this.draftConfig);
        this.draftConfig = new WidgetConfiguration('Unnamed', []);

        this.renderScreenMenu(screenName);
    };

    /**
     * @param {string} activeScreenName
     */
    this.renderScreenMenu = function (activeScreenName)
    {
        var widgetController = app.WidgetController;
        widgetController.draftActive = activeScreenName === 'Individual draft';
        var availableNames = app.ConfigurationController.widgets.getAvailable();
        availableNames.unshift('Individual draft');
        var screens = [];

        $.each(availableNames, function (i, name) {
            screens.push({
                name: name,
                active: name === activeScreenName
            })
        });

        app.TemplateRepository.get('footerBar/screenBar', function (template) {
            widgetController.footerBar.html(Mustache.render(template, {
                draft: widgetController.draftActive,
                activeScreenName: widgetController.draftActive ? '' : activeScreenName,
                screens: screens
            }));

            widgetController.footerBar.find('a.item').each(function (screenIndex) {
                var screenName = availableNames[screenIndex];
                if (screenName !== activeScreenName) {
                    $(this).click(function () {
                        widgetController.loadScreen(screenName);
                    })
                }
            });

            widgetController.saveScreenDropdown = $('.save-screen.dropdown');
            widgetController.saveScreenDropdown.dropdown();
        });
    };

    /**
     * @param {string} name
     */
    this.loadScreen = function (name)
    {
        this.closeCurrentWidgets();
        app.WidgetController.activeScreenName = name;

        if (name !== 'Individual draft') {
            var widgetConfig = app.ConfigurationController.widgets.getByName(name);

            $.each(widgetConfig.widgetsIds, function (i, widgetId) {
                app.WidgetController.showWidget(widgetId);
            });
        }
        this.renderScreenMenu(name);
    };

    this.closeCurrentWidgets = function ()
    {
        $.each(app.WidgetController.widgets, function (i, widget) {
            if (widget.active) {
                widget.close();
            }
        })
    };

    /**
     * @param {AbstractWidget} widget
     */
    this.onTearDown = function (widget)
    {
        this.draftConfig.remove(widget.id);
    }
}