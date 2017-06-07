function FooterBarController()
{
    /**
     * @type {string}
     */
    this.activeScreenName = 'Individual draft';

    /**
     * @type {boolean}
     */
    this.draftScreenActive = true;

    /**
     * @type {Object}
     */
    this.footerBar = undefined;

    /**
     * @type {Object}
     */
    this.saveScreenDropdown = undefined;

    /**
     * @type {Object}
     */
    this.networkConfigDropdown = undefined;

    /**
     *
     * @type {boolean}
     */
    this.initialized = false;

    this.init = function ()
    {
        this.footerBar = $('#fixedFooter');
        this.initialized = true;
        this.render();
    };

    /**
     * @param {function} [callback]
     */
    this.render = function (callback)
    {
        if (this.initialized) {
            var barController = app.FooterBarController;

            this.draftScreenActive = this.activeScreenName === 'Individual draft';

            var availableNames = app.ConfigurationController.widgets.getAvailable();
            availableNames.unshift('Individual draft');
            var screens = [];

            $.each(availableNames, function (i, name) {
                screens.push({
                    name: name,
                    active: name === barController.activeScreenName
                })
            });

            app.TemplateRepository.get('footerBar/footerBar', function (template) {
                barController.footerBar.html(Mustache.render(template, {
                    draft: barController.draftScreenActive,
                    activeScreenName: barController.draftScreenActive ? '' : barController.activeScreenName,
                    screens: screens,
                    authToken: app.ConfigurationController.network.getAuthToken(),
                    relayServerA: app.ConfigurationController.network.getRelayServerA(),
                    relayServerB: app.ConfigurationController.network.getRelayServerB()
                }));

                barController.footerBar.find('a.item').each(function (screenIndex) {
                    var screenName = availableNames[screenIndex];
                    if (screenName !== barController.activeScreenName) {
                        $(this).click(function () {
                            app.WidgetController.loadScreen(screenName);
                        })
                    }
                });

                barController.saveScreenDropdown = $('.save-screen.dropdown');
                barController.saveScreenDropdown.dropdown();

                barController.networkConfigDropdown = $('.network-config.dropdown');
                barController.networkConfigDropdown.dropdown();

                if (callback) {
                    callback();
                }
            });
        }
    };

    this.saveCurrentScreen = function ()
    {
        var screenName = $('#screenNameInput').val();
        app.WidgetController.draftConfig.name = screenName;
        app.ConfigurationController.widgets.save(app.WidgetController.draftConfig);
        app.WidgetController.draftConfig = new WidgetConfiguration('Unnamed', []);

        this.activeScreenName = screenName;
        this.render();
    };

    this.saveNetworkConfig = function ()
    {
        app.ConfigurationController.network.setAuthToken(this.footerBar.find('input.authTokenInput').val());
        app.ConfigurationController.network.setRelayServerA(this.footerBar.find('input.relayServerAInput').val());
        app.ConfigurationController.network.setRelayServerB(this.footerBar.find('input.relayServerBInput').val());

        app.ConnectionController.init();
    }
}