function MotorStatusHistoryWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'motorStatusHistoryWidget';

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
    this.maxDataPoints = 100;

    /**
     * @type {number}
     */
    this.counter = 0;

    /**
     * @type {[*]}
     */
    this.colors = [
        [75, 192, 192],
        [73, 192, 84],
        [175, 192, 68],
        [192, 161, 52],
        [192, 54, 53],
        [192, 85, 147],
        [117, 72, 192],
        [206, 206, 206]
    ];

    /**
     * @type {{labels: Array, datasets: [*]}}
     */
    this.data = {
        labels: [],
        datasets: []
    };

    /**
     * @type {{}}
     */
    this.options = {
        animation: false,
        layout: {
            padding: {
                top: 20
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'rgba(70, 70, 70, 0.4)'
                },
                ticks: {
                    autoSkip: true,
                    autoSkipPadding: 10,
                }
            }],
            yAxes: [{
                gridLines: {
                    color: 'rgba(70, 70, 70, 0.4)'
                },
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                }
            }]
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };
    this.init = function ()
    {
        for (var i = 0; i < 8; i++) {
            this.data.datasets.push({
                label: "H" + i,
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(" + this.colors[i][0] + "," + this.colors[i][1] + "," + this.colors[i][2] + ",0.4)",
                borderColor: "rgba(" + this.colors[i][0] + "," + this.colors[i][1] + "," + this.colors[i][2] + ",1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(" + this.colors[i][0] + "," + this.colors[i][1] + "," + this.colors[i][2] + ",1)",
                pointBackgroundColor: "#636363",
                pointBorderWidth: 0,
                pointHoverRadius: 0,
                pointHoverBackgroundColor: "rgba(" + this.colors[i][0] + "," + this.colors[i][1] + "," + this.colors[i][2] + ",1)",
                pointHoverBorderColor: "rgba(" + this.colors[i][0] + "," + this.colors[i][1] + "," + this.colors[i][2] + ",1)",
                pointHoverBorderWidth: 0,
                pointRadius: 0,
                pointHitRadius: 0,
                data: [],
                spanGaps: true
            })
        }

        this.chart = new Chart($('#MotorStatusHistoryWidget').find('canvas').get()[0], {
            type: 'line',
            data: this.data,
            options: this.options
        });

        this.subscriber = new Subscriber(MotorStatus.topic, 100, 'motorStatusHistoryWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {MotorStatus} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[MotorStatusHistoryWidget.id];
        widget.counter++;

        if (widget.counter % 1 === 0  ) {
            widget.data.labels.push(widget.counter);
            widget.data.datasets[0].data.push(message.motors[0].getPowerInPercent());
            widget.data.datasets[1].data.push(message.motors[1].getPowerInPercent());
            widget.data.datasets[2].data.push(message.motors[2].getPowerInPercent());
            widget.data.datasets[3].data.push(message.motors[3].getPowerInPercent());
            widget.data.datasets[4].data.push(message.motors[4].getPowerInPercent());
            widget.data.datasets[5].data.push(message.motors[5].getPowerInPercent());
            widget.data.datasets[6].data.push(message.motors[6].getPowerInPercent());
            widget.data.datasets[7].data.push(message.motors[7].getPowerInPercent());

            if (widget.data.labels.length > widget.maxDataPoints) {
                widget.data.labels.splice(0, 1);
                widget.data.datasets[0].data.splice(0, 1);
                widget.data.datasets[1].data.splice(0, 1);
                widget.data.datasets[2].data.splice(0, 1);
                widget.data.datasets[3].data.splice(0, 1);
                widget.data.datasets[4].data.splice(0, 1);
                widget.data.datasets[5].data.splice(0, 1);
                widget.data.datasets[6].data.splice(0, 1);
                widget.data.datasets[7].data.splice(0, 1);
            }
        }

        if (widget.counter > widget.maxDataPoints) {
            widget.chart.update();
        }
    };

    this.tearDown = function ()
    {
        this.subscriber.unregister();
    };
}

/**
 * @type {string}
 */
MotorStatusHistoryWidget.id = 'motorStatusHistoryWidget';