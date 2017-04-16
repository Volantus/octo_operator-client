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
     * @type {{horizontalThrottle: number, verticalThrottle: number, pitch: number, roll: number, yaw: number}}
     */
    this.gamepadSensivity = {
        horizontalThrottle: 0.05,
        verticalThrottle: 0.05,
        pitch: 15,
        roll: 15,
        yaw: 25
    };

    /**
     * @type {number|undefined}
     */
    this.lastGamePadScan = undefined;

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
        }, 100);

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

        app.GamepadController.registerListener('ManualControlWidget', function (gamePad) {
            widget.gamePadScan(gamePad);
        })
    };

    this.changeThrottle = function (attribute, delta)
    {
        var newThrottle = this.motorControlMessage.data[attribute] + delta;
        newThrottle = newThrottle > 1 ? 1 : newThrottle;
        newThrottle = newThrottle < 0 ? 0 : newThrottle;

        this.motorControlMessage.data[attribute] = newThrottle;
        this.updated = true;
    };

    this.changeAngle = function (attribute, delta)
    {
        var newAngle = this.motorControlMessage.data.desiredPosition[attribute] + delta;
        newAngle = newAngle < -180 ? -180 : newAngle;
        newAngle = newAngle > 180 ? 180 : newAngle;

        this.motorControlMessage.data.desiredPosition[attribute] = newAngle;
        this.updated = true;
    };

    this.setAngle = function (attribute, newAngle)
    {
        this.motorControlMessage.data.desiredPosition[attribute] = newAngle;
        this.updated = true;
    };

    this.refresh = function ()
    {
        if (this.updated) {
            this.yawValue.empty().append((this.motorControlMessage.data.desiredPosition.yaw.toFixed(0)));
            this.pitchValue.empty().append(this.motorControlMessage.data.desiredPosition.pitch.toFixed(0));
            this.rollValue.empty().append(this.motorControlMessage.data.desiredPosition.roll.toFixed(0));
            this.horThrottleValue.empty().append((this.motorControlMessage.data.horizontalThrottle * 100).toFixed(1) + '%');
            this.vertThrottleValue.empty().append((this.motorControlMessage.data.verticalThrottle * 100).toFixed(1) + '%');

            app.ConnectionController.sendData(JSON.stringify(this.motorControlMessage));

            this.updated = false;
        }
    };

    /**
     * @param {*} gamePad
     */
    this.gamePadScan = function (gamePad)
    {
        if (this.lastGamePadScan !== undefined) {
            var timeDelta = (performance.now() - this.lastGamePadScan) / 1000;

            if (gamePad.buttons[0].value > 0) {
                this.startMotorsButton.click();
            }

            if (gamePad.buttons[1].value > 0) {
                this.motorControlMessage.data.desiredPosition.yaw = 0;
                this.stopMotorsButton.click();
            }

            this.changeThrottle('horizontalThrottle', timeDelta * gamePad.buttons[7].value * this.gamepadSensivity.horizontalThrottle);
            this.changeThrottle('horizontalThrottle', -(timeDelta * gamePad.buttons[6].value * this.gamepadSensivity.horizontalThrottle));
            this.changeThrottle('verticalThrottle', timeDelta * gamePad.buttons[5].value * this.gamepadSensivity.verticalThrottle);
            this.changeThrottle('verticalThrottle', -(timeDelta * gamePad.buttons[4].value * this.gamepadSensivity.verticalThrottle));

            if (gamePad.axes[0] > 0.05 || gamePad.axes[0] < 0.05) {
                this.changeAngle('yaw', timeDelta * gamePad.axes[0] * this.gamepadSensivity.yaw);
            }

            if (gamePad.axes[2] > 0.05 || gamePad.axes[2] < 0.05) {
                this.setAngle('roll',  gamePad.axes[2] * this.gamepadSensivity.roll);
            }

            if (gamePad.axes[3] > 0.05 || gamePad.axes[3] < 0.05) {
                this.setAngle('pitch', -(gamePad.axes[3]) * this.gamepadSensivity.pitch);
            }
        }

        this.lastGamePadScan = performance.now();
    };

    this.tearDown = function ()
    {
        clearInterval(this.refreshInteval);
    };
}

ManualControlWidget.id = 'manualControlWidget';