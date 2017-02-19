function ManualControlWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {string}
     */
    this.templateId = 'manualControlWidget';

    /**
     * @type {*}
     */
    this.yawValue = undefined;

    /**
     * @type {*}
     */
    this.pitchValue = undefined;

    /**
     * @type {*}
     */
    this.rollValue = undefined;

    /**
     * @type {*}
     */
    this.horThrottleValue = undefined;

    /**
     * @type {*}
     */
    this.vertThrottleValue = undefined;

    /**
     * @type {MotorControlMessage}
     */
    this.motorControlMessage = undefined;

    /**
     * @type {number}
     */
    this.refreshInteval = undefined;

    this.init = function ()
    {
        this.yawValue = $('#motorControlYawValue');
        this.pitchValue = $('#motorControlPitchValue');
        this.rollValue = $('#motorControlRollValue');
        this.horThrottleValue = $('#motorControlHorThrottleValue');
        this.vertThrottleValue = $('#motorControlVerThrottleValue');

        this.motorControlMessage = new MotorControlMessage(0.0, 0.0, 0.0, 0.0, 0.0, false);

        this.refreshInteval = setInterval(function () {
            app.WidgetController.widgets[ManualControlWidget.id].refresh();
        }, 0.1);


    };

    this.refresh = function ()
    {
        this.yawValue.html(this.motorControlMessage.data.desiredPosition.yaw);
        this.pitchValue.html(this.motorControlMessage.data.desiredPosition.pitch);
        this.rollValue.html(this.motorControlMessage.data.desiredPosition.roll);
        this.horThrottleValue.html(this.motorControlMessage.data.horizontalThrottle.toFixed(2) + '%');
        this.vertThrottleValue.html(this.motorControlMessage.data.verticalThrottle.toFixed(2) + '%');
    };

    this.tearDown = function ()
    {
        clearInterval(this.refreshInteval);
    };
}

ManualControlWidget.id = 'manualControlWidget';