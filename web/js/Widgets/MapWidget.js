function MapWidget()
{
    this.mapOptions = {
        zoom: 14,
        disableDefaultUI: true,
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
    };

    this.map                   = undefined;
    this.currentPositionMarker = undefined;
    this.polygon               = undefined;
}

MapWidget.prototype.init = function ()
{
    console.log('[Map Widget] Initialisation');
    this.render('GeoPositionMap');
    this.refresh(function () {
        $('#GeoPositionMap').removeClass('loading');
    })
};

MapWidget.prototype.refresh = function (callback) {
    app.GeoPositionController.getAllPositions(function (positions) {
        if (positions.length > 0) {
            app.MapWidget.setCurrentPosition(positions.pop());
        }

        if (positions.length > 0) {
            app.MapWidget.setPreviousPositions(positions);
        }

        if (callback != undefined) {
            callback();
        }
    });
};

MapWidget.prototype.reset = function (triggerButton) {
    if (triggerButton != undefined) {
        triggerButton = $(triggerButton);
        triggerButton.addClass('loading');
    }

    app.GeoPositionController.deleteAllGeoPositions(function () {
        app.MapWidget.resetMarker();
        if (triggerButton != undefined) {
            triggerButton.removeClass('loading');
        }
    });
};

/**
 * Sets the current position
 *
 * @param {GeoPosition} currentPosition
 */
MapWidget.prototype.setCurrentPosition = function (currentPosition) {
    if (this.currentPositionMarker != undefined) {
        this.currentPositionMarker.setMap(null);
    }

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        map: this.map,
        title: 'Current position'
    });

    if (this.currentPositionMarker == undefined) {
        this.map.setCenter(marker.getPosition());
    }

    this.currentPositionMarker = marker;
};

MapWidget.prototype.setPreviousPositions = function (positions)
{
    var cords = [];

    $.each(positions, function (key, position) {
        cords.push({lat: position.latitude, lng: position.longitude});
    });

    var polygon = new google.maps.Polygon({
        paths: cords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
    polygon.setMap(this.map);

    if (this.polygon != undefined) {
        this.polygon.setMap(null);
    }

    this.polygon = polygon;
};

MapWidget.prototype.render = function (elementId)
{
    var mapElement = document.getElementById(elementId);
    this.map = new google.maps.Map(mapElement, this.mapOptions);
};

MapWidget.prototype.resetMarker = function () {
    if (this.polygon != undefined) {
        this.polygon.setMap(null);
        this.polygon = undefined;
    }

    if (this.currentPositionMarker != undefined) {
        this.currentPositionMarker.setMap(null);
        this.currentPositionMarker = undefined;
    }
};