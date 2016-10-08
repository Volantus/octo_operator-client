function MotorStatusRepository()
{
    /**
     * @type {MotorStatusCollection[]}
     */
    this.statusCollections = [];

    /**
     * @type {MotorStatusListener[]}
     */
    this.listener = [];

    /**
     * @param {MotorStatusCollection} collection
     */
    this.addStatusCollection = function (collection)
    {
        this.statusCollections.push(collection);

        if (this.statusCollections.length > 10) {
            this.statusCollections.splice(0, 1);
        }

        this.notifyListener(collection);
    };

    /**
     * @param {MotorStatusCollection} collection
     */
    this.notifyListener = function (collection)
    {
        $.each(this.listener, function (i, listener) {
            if (listener != undefined) {
                listener.newMotorStatus(collection);
            }
        })
    };

    /**
     * @param {MotorStatusListener} listener
     */
    this.addListener = function (listener)
    {
        this.listener.push(listener);
    };

    /**
     * @param {MotorStatusListener} listener
     */
    this.removeListener = function (listener)
    {
        var index = this.listener.indexOf(listener);
        this.listener.splice(index, 1);
    }
}



