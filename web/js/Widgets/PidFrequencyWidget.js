function PidFrequencyWidget()
{
    AbstractWidget.call(this);

    /**
     * @type {Subscriber}
     */
    this.subscriber = undefined;

    /**
     * @type {string}
     */
    this.templateId = 'pidFrequencyWidget';

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
    this.maxDataPoints = 30;

    /**
     * @type {{labels: Array, datasets: [*]}}
     */
    this.data = {
        labels: [],
        datasets: [
            {
                label: "Frequency",
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
                data: []
            }
        ]
    };

    /**
     * @type {{animation: boolean, legend: {display: boolean}, scales: {xAxes: [*], yAxes: [*]}}}
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
                beginAtZero: false,
                ticks: {
                    min: 0,
                    max: 100
                }
            }]
        }
    };

    /**
     * @type {boolean}
     */
    this.scaleAdjusted = false;

    this.init = function ()
    {
        this.subscriber = new Subscriber(PidFrequencyStatus.topic, 32, 'pidFrequencyWidget', this.handleMessage);
        this.subscriber.register();
    };

    this.initChart = function()
    {
        this.chart = new Chart($('#PidFrequencyWidget').find('canvas').get()[0], {
            type: 'bar',
            data: this.data,
            options: this.options
        });
    };

    /**
     * @param {PidFrequencyStatus} message
     */
    this.handleMessage = function (message)
    {
        var widget = app.WidgetController.widgets[PidFrequencyWidget.id];
        widget.counter++;

        console.log(message);

        if (!widget.scaleAdjusted) {
            widget.scaleAdjusted = true;
            widget.options.scales.yAxes[0].ticks.max = message.desired * 1.2;
            widget.options.scales.yAxes[0].ticks.min = message.desired * 0.4;

            widget.initChart();
        }

        widget.data.labels.push(widget.counter);
        widget.data.datasets[0].data.push(message.current);

        if (message.current > (message.desired * 1.00) || message.current < (message.desired * 0.90)) {
            widget.data.datasets[0].backgroundColor.push('rgba(255, 99, 0, 0.5)');
            widget.data.datasets[0].borderColor.push('rgba(255, 99, 0, 1)');
        } else {
            widget.data.datasets[0].backgroundColor.push('rgba(40, 176, 0, 0.5)');
            widget.data.datasets[0].borderColor.push('rgba(40, 176, 0, 1)');
        }

        if (widget.data.labels.length > widget.maxDataPoints) {
            widget.data.labels.splice(0, 1);
            widget.data.datasets[0].data.splice(0, 1);
            widget.data.datasets[0].backgroundColor.splice(0, 1);
            widget.data.datasets[0].borderColor.splice(0, 1);
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
PidFrequencyWidget.id = 'pidFrequencyWidget';