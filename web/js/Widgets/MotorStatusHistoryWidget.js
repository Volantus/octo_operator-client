function MotorStatusHistoryWidget()
{
    AbstractWidget.call(this);
    MotorStatusListener.call(this);

    /**
     * @type {{}}
     */
    this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    max: 1,
                    min: 0,
                    stepSize: 0.1
                }
            }]
        }
    };

    /**
     * @type {{labels: string[], datasets: *[]}}
     */
    this.data = {
        labels: [],
        datasets: []
    };

    /**
     * @type {*[]}
     */
    this.colors = [
        [0, 255, 255],
        [255, 106, 5],
        [0, 0, 255],
        [255, 0, 0],
        [61, 255, 0],
        [135, 0, 255],
        [7, 102, 0],
        [223, 223, 0],
        [255, 36, 225],
        [105, 105, 105]
    ];

    /**
     * @type {Chart}
     */
    this.chart = undefined;

    this.init = function ()
    {
        this.initDataSets();
        this.chart = new Chart($('#motorStatusHistoryChart'), {
            type: 'line',
            data:    this.data,
            options: this.chartOptions
        });
        app.MotorStatusRepository.addListener(this);
    };

    this.initDataSets = function ()
    {
        $.each(this.colors, function (position, colors) {
            app.MotorStatusHistoryWidget.data.datasets.push({
                label: "Motor " + position,
                data: [],
                borderColor: 'rgba(' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ', 0.8)',
                backgroundColor: 'rgba(' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ', 0.1)',
                lineTension: 0.2
            });
        })
    };

    /**
     * @param {MotorStatusCollection} motorStatus
     */
    this.newMotorStatus = function (motorStatus)
    {
        this.data.labels.push(motorStatus.time.format('HH:mm'));
        var removeOldestValues = false;

        if (this.data.labels.length > 15) {
            this.data.labels.splice(0, 1);
            removeOldestValues = true;
        }

        $.each(motorStatus.motors, function (i, motor) {
            app.MotorStatusHistoryWidget.data.datasets[motor.position].data.push(motor.currentSpeed);

            if (removeOldestValues) {
                app.MotorStatusHistoryWidget.data.datasets[motor.position].data.splice(0, 1);
            }
        });

        this.chart.update();
    };

    this.tearDown = function ()
    {
        app.MotorStatusRepository.removeListener(this);
    };
}