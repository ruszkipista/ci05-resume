function initMap() {
    const mapProperties = {
        zoom: 9,
        center: { lat: 40.8, lng: -73.93 }
    }
    let map = new google.maps.Map(document.getElementById("map"), mapProperties);

    const labels = "ABCDEFGHIJKLMONPQRSTUVWXYZ";
    const locations = [{ lat: 40.785091, lng: -73.968285 },
                       { lat: 41.084045, lng: -73.874256 },
                       { lat: 40.754932, lng: -73.984016 }];
    // generate list of markers from locations
    const markers = locations.map(function (location, index) {
        return new google.maps.Marker({
            position: location,
            // ensure circular label assignment
            label: labels[index % labels.length]
        });
    });
    const markerImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
    const markerCluster = new MarkerClusterer(map, markers, { imagePath: markerImagePath });
}
