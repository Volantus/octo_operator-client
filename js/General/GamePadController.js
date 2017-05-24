function GamepadController() {
    /**
     * @type {number}
     */
    this.gamePadId = undefined;

    /**
     * @type {number}
     */
    this.scanInterval = undefined;

    /**
     * @type {{}}
     */
    this.listener = {};

    /**
     * @type {number}
     */
    this.sampleIime = 10;

    this.init = function ()
    {
        var controller = this;

        window.addEventListener("gamepadconnected", function (e) {
            console.log('[GamepadController] New Gamepad with id ' + e.gamepad.index + ' connected.');
            controller.gamePadId = e.gamepad.index;

            controller.scanInterval = setInterval(function () {
                $.each(controller.listener, function (i, listener) {
                    if (listener !== undefined) {
                        listener(navigator.getGamepads()[controller.gamePadId]);
                    }
                })
            }, controller.sampleIime);
        });

        window.addEventListener("gamepaddisconnected", function (e) {
            console.log('[GamepadController] Gamepad with id ' + e.gamepad.index + ' disconnected.');
            controller.gamePad = undefined;
            clearInterval(controller.scanInterval);
        });
    };

    this.registerListener = function (id, listener)
    {
        this.listener[id] = listener;
    };

    this.unRegisterListener = function (id)
    {
        this.listener[id] = undefined;
    };
}