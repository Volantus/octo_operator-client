function WidgetController()
{
    /**
     * @type {Object}
     */
    this.selectionDropdown = undefined;

    this.init = function ()
    {
        this.selectionDropdown = $('#WidgetSelectionDropdown');
        this.selectionDropdown.dropdown({

        });
    }
}