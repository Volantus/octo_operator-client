function DirectControlWidget()
{
    AbstractWidget.call(this);
    MotorStatusListener.call(this);

    /**
     * @type {Object}
     */
    this.segment = undefined;

    /**
     * @type {Object}
     */
    this.vertPowerButton = undefined;

    /**
     * @type {Object}
     */
    this.horPowerButton = undefined;

    /**
     * @type {Object[]}
     */
    this.vertControlButtons = [];

    /**
     * @type {Object[]}
     */
    this.horControlButtons = [];

    /**
     * @type {string}
     */
    this.motorStatusHash = undefined;

    /**
     * @type {number[]}
     */
    this.horMotors = [0, 1, 2, 3, 4, 5, 6, 7];

    /**
     * @type {number[]}
     */
    this.vertMotors = [8, 9];

    this.init = function ()
    {
        this.segment = $('#directControlWidget');
        this.vertPowerButton = $('#verticalMotorPowerButton');
        this.horPowerButton = $('#horizontalMotorPowerButton');
        this.vertControlButtons = this.segment.find('.vertical-motors .button');
        this.horControlButtons = this.segment.find('.horizontal-motors .button');

        app.MotorStatusRepository.addListener(this);
    };

    /**
     * @param {MotorStatusCollection} motorStatus
     */
    this.newMotorStatus = function (motorStatus)
    {
        var horMotorsStarted  = motorStatus.getPosition(0).started;
        var vertMotorsStarted = motorStatus.getPosition(8).started;
        var motorStatusHash   = horMotorsStarted.toString() + '-' + vertMotorsStarted.toString();

        if (motorStatusHash != this.motorStatusHash) {
            this.motorStatusHash = motorStatusHash;
            this.vertPowerButton.removeClass('disabled loading');
            this.horPowerButton.removeClass('disabled loading');

            if (vertMotorsStarted) {
                this.vertControlButtons.removeClass('disabled');
                this.disablePowerButton(this.vertPowerButton, 'vertical');
            } else {
                this.vertControlButtons.addClass('disabled');
                this.enablePowerButton(this.vertPowerButton, 'vertical');
            }

            if (horMotorsStarted) {
                this.horControlButtons.removeClass('disabled');
                this.disablePowerButton(this.horPowerButton, 'horizontal');
            } else {
                this.horControlButtons.addClass('disabled');
                this.enablePowerButton(this.horPowerButton, 'horizontal');
            }
        }
    };

    /**
     * @param {Object} button
     * @param {string} motors
     */
    this.enablePowerButton = function (button, motors)
    {
        button.removeClass('red');
        button.addClass('olive');
        button.html('<i class="play icon"></i>Start motors');

        button.off().on('click', function () {
            app.DirectControlWidget.switchMotors(motors, 1);
        })
    };

    /**
     * @param {Object} button
     * @param {string} motors
     */
    this.disablePowerButton = function (button, motors)
    {
        button.removeClass('olive');
        button.addClass('red');
        button.html('<i class="stop icon"></i>Stop motors');

        button.off().on('click', function () {
            app.DirectControlWidget.switchMotors(motors, 0);
        })
    };

    /**
     * @param {string} motors
     * @param {int} state
     */
    this.switchMotors = function (motors, state)
    {
        var title     = (state == 1 ? 'Start' : 'Stop') + ' ' + motors + ' motors';
        var positions = motors == 'horizontal' ? this.horMotors : this.vertMotors;
        var message = new MotorStateControlMessage(title, positions, state);

        if (motors == 'horizontal') {
            this.horPowerButton.addClass('loading');
        } else {
            this.vertPowerButton.addClass('loading');
        }

        app.DirectControlController.sendMessage(message);
    };

    /**
     * @param {string} direction
     */
    this.horizontalSpin = function (direction)
    {
        var factor         = direction == 'right' ? 1 : -1;
        var leftMessage    = new MotorSpeedControlMessage([0, 2, 4, 6], "Dec. left spin. motors (- 2%)", -0.02 * factor);
        var rightMessage   = new MotorSpeedControlMessage([1, 3, 5, 7], "Acc. right spin. motors (+ 2%)", 0.02 * factor);

        app.DirectControlController.sendMessage(rightMessage);
        app.DirectControlController.sendMessage(leftMessage);
    };

    /**
     * @param {string} motors
     * @param {string} direction
     */
    this.changeSpeed = function (motors, direction)
    {
        var title = (direction == 'accelerate' ? 'Acc' : 'Dec') + ". " + motors.substr(0, 3) + ". motors (+ 2%)";
        var delta = (direction == 'accelerate' ? 1 : -1) * 0.02;
        var positions = motors == 'horizontal' ? this.horMotors : this.vertMotors;

        var message = new MotorSpeedControlMessage(positions, title, delta);
        app.DirectControlController.sendMessage(message);
    }
}