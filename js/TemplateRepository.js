function TemplateRepository()
{
    /**
     * @type {{}}
     */
    this.templates = {};

    /**
     * @type {string[]}
     */
    this.preloaded = [
        'statusBar/connectionStatus'
    ];

    this.init = function ()
    {
        $.each(this.preloaded, function(i, templateName) {
            app.TemplateRepository.load(templateName, undefined);
        })
    };

    /**
     * @param {string} templateName
     * @param {function} callback
     * @return {string}
     */
    this.get = function (templateName, callback) {
        var template = this.templates[templateName];
        if (template === undefined) {
            this.load(templateName, callback)
        } else {
            callback(app.TemplateRepository.templates[templateName]);
        }
    };

    /**
     * @param {string} templateName
     * @param {function|undefined} callback
     */
    this.load = function (templateName, callback) {
        $.get('/templates/' + templateName + '.html', function (data) {
            Mustache.parse(data);
            app.TemplateRepository.templates[templateName] = data;

            if (callback !== undefined) {
                callback(app.TemplateRepository.templates[templateName]);
            }
        });
    };
}