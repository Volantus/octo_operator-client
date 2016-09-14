function GeoPositionController()
{

}

/**
 * Fetchs new positions from server
 *
 * @param callback Called with list of GeoPositions objects
 */
GeoPositionController.prototype.getAllPositions = function (callback) {
    $.ajax({
        url: '/api/geo-positions',
        method: 'GET',
        success: function (data) {
            var positions = app.GeoPositionController.buildGeoPositionFromRequest(JSON.parse(data));
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
GeoPositionController.prototype.buildGeoPositionFromRequest = function (data) {
    var result = [];

    $.each(data, function (key, position) {
        result.push(new GeoPosition(position.latitude, position.longitude, position.altimeter));
    });

    return result;
};