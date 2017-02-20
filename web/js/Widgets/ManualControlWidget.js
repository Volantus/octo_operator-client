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
    this.startMotorsButton = undefined;

    /**
     * @type {*}
     */
    this.stopMotorsButton = undefined;

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

    /**
     * @type {boolean}
     */
    this.updated = true;

    this.init = function ()
    {
        var widget = app.WidgetController.widgets[ManualControlWidget.id];

        this.startMotorsButton = $('#startMotorsButton');
        this.stopMotorsButton = $('#stopMotorsButton');

        this.yawValue = $('#motorControlYawValue');
        this.pitchValue = $('#motorControlPitchValue');
        this.rollValue = $('#motorControlRollValue');
        this.horThrottleValue = $('#motorControlHorThrottleValue');
        this.vertThrottleValue = $('#motorControlVerThrottleValue');

        this.motorControlMessage = new MotorControlMessage(0.0, 0.0, 0.0, 0.0, 0.0, false);

        this.startMotorsButton.click(function () {
            widget.startMotorsButton.addClass('disabled');
            widget.stopMotorsButton.removeClass('disabled');

            widget.motorControlMessage.data.motorsStarted = true;
            widget.updated = true;
        });

        this.stopMotorsButton.click(function () {
            widget.stopMotorsButton.addClass('disabled');
            widget.startMotorsButton.removeClass('disabled');

            widget.motorControlMessage.data.motorsStarted = false;
            widget.updated = true;
        });

        this.refreshInteval = setInterval(function () {
            widget.refresh();
        }, 0.1);

        $(document).bind('keydown', '1', function () {
            widget.changeThrottle('horizontalThrottle', -0.01);
        });

        $(document).bind('keydown', '2', function () {
            widget.changeThrottle('horizontalThrottle', 0.01);
        });

        $(document).bind('keydown', '3', function () {
            widget.changeThrottle('verticalThrottle', -0.01);
        });

        $(document).bind('keydown', '4', function () {
            widget.changeThrottle('verticalThrottle', 0.01);
        });

        $(document).bind('keydown', 'up', function () {
            widget.changeAngle('pitch', 1);
        });

        $(document).bind('keydown', 'down', function () {
            widget.changeAngle('pitch', -1);
        });

        $(document).bind('keydown', 'right', function () {
            widget.changeAngle('roll', 1);
        });

        $(document).bind('keydown', 'left', function () {
            widget.changeAngle('roll', -1);
        });

        $(document).bind('keydown', 'a', function () {
            widget.changeAngle('yaw', 1);
        });

        $(document).bind('keydown', 'd', function () {
            widget.changeAngle('yaw', -1);
        });
    };

    this.changeThrottle = function (attribute, delta)
    {
        var newThrottle = this.motorControlMessage.data[attribute] + delta;
        newThrottle = Math.round(newThrottle * 1000) / 1000;

        if (newThrottle <= 1 && newThrottle >= 0) {
            this.motorControlMessage.data[attribute] = newThrottle;
            this.updated = true;
        }
    };

    this.changeAngle = function (attribute, delta)
    {
        var newAngle = this.motorControlMessage.data.desiredPosition[attribute] + delta;
        newAngle = Math.round(newAngle * 1000) / 1000;

        if (newAngle >= -180 && newAngle <= 180) {
            this.motorControlMessage.data.desiredPosition[attribute] = newAngle;
            this.updated = true;
        }
    };


    this.refresh = function ()
    {
        if (this.updated) {
            this.yawValue.empty().append((this.motorControlMessage.data.desiredPosition.yaw));
            this.pitchValue.empty().append(this.motorControlMessage.data.desiredPosition.pitch);
            this.rollValue.empty().append(this.motorControlMessage.data.desiredPosition.roll);
            this.horThrottleValue.empty().append((this.motorControlMessage.data.horizontalThrottle * 100).toFixed(1) + '%');
            this.vertThrottleValue.empty().append((this.motorControlMessage.data.verticalThrottle * 100).toFixed(1) + '%');

            app.ConnectionController.sendData(JSON.stringify(this.motorControlMessage));

            this.updated = false;
        }
    };

    this.tearDown = function ()
    {
        clearInterval(this.refreshInteval);
    };
}

ManualControlWidget.id = 'manualControlWidget';