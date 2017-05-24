function CurrentMotorStatusWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'currentMotorStatusWidget';

    /**
     * @type {Chart}
     */
    this.chart = undefined;

    /**
     * @type {number}
     */
    this.counter = 0;

    /**
     * @type {number}
     */
    this.maxDataPoints = 300;

    /**
     * @type {{labels: Array, datasets: [*]}}
     */
    this.data = {
        labels: ['H0', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'V0', 'V1'],
        datasets: [
            {
                label: "Motor status",
                backgroundColor: [
                    "rgba(75,192,192,0.4)",
                    "rgba(75,192,192,0.4)",
                    "rgba(75,192,192,0.4)",
                    "rgba(75,192,192,0.4)",
                    "rgba(75,192,192,0.4)",
                    "rgba(75,192,192,0.4)",
                    "rgba(75,192,192,0.4)",
                    "rgba(75,192,192,0.4)",
                    "rgba(75,292,192,0.4)",
                    "rgba(75,292,192,0.4)"
                ],
                borderColor: [
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                    "rgba(75,292,192,1)",
                    "rgba(75,292,192,1)"
                ],
                borderWidth: 1,
                data: []
            }
        ]
    };

    /**
     * @type {{}}
     */
    this.options = {
        animation: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'rgba(70, 70, 70, 0.4)'
                }
            }],
            yAxes: [{
                gridLines: {
                    color: 'rgba(70, 70, 70, 0.4)'
                },
                beginAtZero: true,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }]
        }
    };

    this.init = function ()
    {
        this.chart = new Chart($('#CurrentMotorStatusWidget').find('canvas').get()[0], {
            type: 'bar',
            data: this.data,
            options: this.options
        });

        this.subscriber = new Subscriber(MotorStatus.topic, 2, 'currentMotorStatusWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {MotorStatus} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[CurrentMotorStatusWidget.id];
        widget.data.datasets[0].data = [
            message.motors[0].getPowerInPercent(),
            message.motors[1].getPowerInPercent(),
            message.motors[2].getPowerInPercent(),
            message.motors[3].getPowerInPercent(),
            message.motors[4].getPowerInPercent(),
            message.motors[5].getPowerInPercent(),
            message.motors[6].getPowerInPercent(),
            message.motors[7].getPowerInPercent(),
            message.motors[8].getPowerInPercent(),
            message.motors[9].getPowerInPercent()
        ];
        widget.chart.update();
    };

    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };
}

/**
 * @type {string}
 */
CurrentMotorStatusWidget.id = 'currentMotorStatusWidget';