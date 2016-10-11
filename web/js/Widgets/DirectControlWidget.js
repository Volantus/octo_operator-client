function DirectControlWidget()
{
    AbstractWidget.call(this);

    this.segment = undefined;

    this.init = function ()
    {
        this.segment = $('#directControlWidget');
    };

    this.enableAllButtons = function ()
    {
        this.segment.find('.button').removeClass('disabled');
    };

    this.accelerateHorizontalMotors = function ()
    {
        var title = "Acc. hor. motors (+ 2%)";
        var message = new MotorSpeedControlMessage([0, 1, 2, 3, 4, 5, 6, 7], title, 0.02);
        app.DirectControlController.sendMessage(message);
    }
}