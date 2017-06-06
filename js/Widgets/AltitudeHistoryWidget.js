function AltitudeHistoryWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {string}
     */
    this.id = AltitudeHistoryWidget.id;

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'altitudeHistoryWidget';

    /**
     * @type {string}
     */
    this.segmentId = 'AltitudeHistoryWidget';

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
    this.maxDataPoints = 1500;

    /**
     * @type {{labels: Array, datasets: [*]}}
     */
    this.data = {
        labels: [],
        datasets: [
            {
                label: "Absolute height",
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#636363",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: true
            }
        ]
    };

    /**
     * @type {{}}
     */
    this.options = {
        animation: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'rgba(70, 70, 70, 0.4)'
                },
                ticks: {
                    autoSkip: true,
                    autoSkipPadding: 10
                }
            }],
            yAxes: [{
                gridLines: {
                    color: 'rgba(70, 70, 70, 0.4)'
                }
            }]
        }
    };

    this.init = function ()
    {
        this.chart = new Chart($('#AltitudeHistoryWidget').find('canvas').get()[0], {
            type: 'line',
            data: this.data,
            options: this.options
        });

        this.subscriber = new Subscriber(GeoPositionMessage.topic, 100, 'altitudeHistoryWidget', this.handleMessage);
        this.subscriber.register();
    };

    /**
     * @param {GeoPosition} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[AltitudeHistoryWidget.id];
        widget.data.labels.push(++widget.counter);
        widget.data.datasets[0].data.push(message.altitude);

        if (widget.data.labels.length > widget.maxDataPoints) {
            widget.data.labels.splice(0, 1);
            widget.data.datasets[0].data.splice(0, 1);
        }

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
AltitudeHistoryWidget.id = 'altitudeHistoryWidget';