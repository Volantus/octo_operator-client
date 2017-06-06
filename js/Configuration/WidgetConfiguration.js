/**
 * @param {string} name
 * @param {Array} widgetIds
 * @constructor
 */
function WidgetConfiguration (name, widgetIds)
{
    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {Array}
     */
    this.widgetsIds = widgetIds;

    /**
     * @param {string} id
     */
    this.add = function (id)
    {
        this.widgetsIds.push(id);
    };

    /**
     * @param {string} id
     */
    this.remove = function (id)
    {
        this.widgetsIds.splice(this.widgetsIds.indexOf(id), 1);
    }
}