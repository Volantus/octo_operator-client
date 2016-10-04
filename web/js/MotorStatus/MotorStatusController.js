function MotorStatusController()
{
    /**
     * @type {MotorStatusCollection[]}
     */
    this.statusCollections = []
}

/**
 * @param {MotorStatusCollection} collection
 */
MotorStatusController.prototype.addStatusCollection = function (collection)
{
    this.statusCollections.push(collection);

    if (this.statusCollections.length > 10) {
        this.statusCollections.splice(0, 1);
    }
};



