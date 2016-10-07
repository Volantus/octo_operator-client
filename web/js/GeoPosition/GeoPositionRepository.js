function GeoPositionRepository()
{
    /**
     * Fetchs new positions from server
     *
     * @param callback Called with list of GeoPositions objects
     */
    this.getAllPositions = function (callback) {
        $.ajax({
            url: '/api/geo-positions',
            method: 'GET',
            success: function (data) {
                var positions = app.GeoPositionRepository.buildGeoPositionFromRequest(JSON.parse(data));
                callback(positions);
            }
        });
    };

    /**
     * Builds GeoPosition Objects from AJAX request
     *
     * @param data AJAX data
     * @returns {Array}
     */
    this.buildGeoPositionFromRequest = function (data) {
        var result = [];

        $.each(data, function (key, position) {
            result.push(new GeoPosition(position.latitude, position.longitude, position.altitude));
        });

        return result;
    };

    this.deleteAllGeoPositions = function (callback)
    {
        $.ajax({
            url: '/api/geo-positions',
            method: 'DELETE',
            success: function () {
                callback();
            }
        });
    };
}