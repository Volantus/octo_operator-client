function MotorStatusRadarWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'motorStatusRadarWidget';

    /**
     * @type {Chart}
     */
    this.chart = undefined;

    /**
     * @type {{labels: Array, datasets: [*]}}
     */
    this.data = {
        labels: ['H0', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7'],
        datasets: [
            {
                label: "Motor status",
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "rgba(75,192,220,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: []
            }
        ]
    };

    /**
     * @type {{}}
     */
    this.options = {
        animation: false,
        startAngle:23,
        legend: {
            display: false
        },
        scale: {
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                backdropColor: 'rgba(0, 0, 0, 0)'
            },
            gridLines: {
                color: 'rgba(70, 70, 70, 0.4)'
            },
            angleLines: {
                color: 'rgba(70, 70, 70, 0.4)'
            }
        }
    };

    this.init = function ()
    {
        this.chart = new Chart($('#MotorStatusRadarWidget').find('canvas').get()[0], {
            type: 'radar',
            data: this.data,
            options: this.options
        });

        this.subscriber = new Subscriber(MotorStatus.topic, 2, 'motorStatusRadarWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {MotorStatus} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[MotorStatusRadarWidget.id];
        widget.data.datasets[0].data = [
            message.motors[0].getPowerInPercent(),
            message.motors[1].getPowerInPercent(),
            message.motors[2].getPowerInPercent(),
            message.motors[3].getPowerInPercent(),
            message.motors[4].getPowerInPercent(),
            message.motors[5].getPowerInPercent(),
            message.motors[6].getPowerInPercent(),
            message.motors[7].getPowerInPercent()
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
MotorStatusRadarWidget.id = 'motorStatusRadarWidget';