function FooterBarController()
{
    /**
     * @type {string}
     */
    this.activeScreenName = 'Individual draft';

    /**
     * @type {Array}
     */
    this.screenConfigs = [];

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

            app.TemplateRepository.get('footerBar/footerBar', function (template) {
                barController.footerBar.html(Mustache.render(template, {
                    draft: barController.draftScreenActive,
                    activeScreenName: barController.draftScreenActive ? '' : barController.activeScreenName,
                    screens: barController.screenConfigs
                }));

                barController.footerBar.find('a.item').each(function (screenIndex) {
                    var screenName = barController.screenConfigs[screenIndex].name;
                    if (screenName !== barController.activeScreenName) {
                        $(this).click(function () {
                            app.WidgetController.loadScreen(screenName);
                        })
                    }
                });

                barController.saveScreenDropdown = $('.save-screen.dropdown');
                barController.saveScreenDropdown.dropdown();

                if (callback) {
                    callback();
                }
            });
        }
    }
}