function PidTuningStatusWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'pidTuningWidget';

    /**
     * @type {*}
     */
    this.instrument = undefined;

    /**
     * @type {{yaw: {Kp: *, Ki: number, Kd: *}, roll: {Kp: *, Ki: *, Kd: *}, pitch: {Kp: *, Ki: *, Kd: *}}}
     */
    this.inputs = {
        yaw: {
            Kp: undefined,
            Ki: undefined,
            Kd: undefined
        },
        roll: {
            Kp: undefined,
            Ki: undefined,
            Kd: undefined
        },
        pitch: {
            Kp: undefined,
            Ki: undefined,
            Kd: undefined
        }
    };

    this.init = function ()
    {
        var segment = $('#PidTuningStatusWidget');
        var inputs = this.inputs;
        this.subscriber = new Subscriber(PidTuningStatusCollection.topic, 2, 'pidTuningWidget', this.handleMessage);
        this.subscriber.register();

        $.each(inputs, function (axis, group) {
            $.each(group, function (constant, field) {
                inputs[axis][constant] = segment.find('.form.' + axis + ' .field.' + constant + ' input');
            })
        });
    };


    /**
     * @param {PidTuningStatusCollection} message
     */
    this.handleMessage = function (message)
    {
        console.log(message);
        var widget = app.WidgetController.widgets[PidTuningStatusWidget.id];

        $.each(widget.inputs, function (axis, group) {
            $.each(group, function (constant, field) {
                field.val(message[axis][constant]);
            })
        });
    };


    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };
}

/**
 * @type {string}
 */
PidTuningStatusWidget.id = 'pidTuningWidget';