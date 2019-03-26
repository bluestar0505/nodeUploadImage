// This example adds a marker to indicate the position of Bondi Beach in Sydney,
var geocoder;
var map;
var marker;
var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: myStyles 
    });
    infoWindow = new google.maps.InfoWindow;
    
    geocoder = new google.maps.Geocoder(); 

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            $('#latitude').val(position.coords.latitude);
            $('#longitude').val(position.coords.longitude);

            infoWindow.setPosition(pos);
            //infoWindow.setContent('This is your position. <br>Please upload Image.');
            //infoWindow.open(map);
            map.setCenter(pos);
            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos),
                map: map,
                icon: image
            });

            getAllImages()
            .then(result => {
                if(result) {
                    images = result.images;
                    for (i = 0; i < images.length; i++) {  
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(images[i]['lat'], images[i]['lng']),
                            map: map
                        });
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                viewImageMap(images[i]['id'], images[i]['file_name'], images[i]['user_id']);
                                //infoWindow.setContent(`${images[i]['id']}`);
                            }
                        })(marker, i));
                    }
                }
            }).catch(error => {
                showErrorMessage(error.responseJSON.message);
            });
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function enterAddress() {
        var address = document.getElementById('address').value;
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
}

function placeMarker(map, location) {
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: image
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'latitude: ' + location.lat() +
        'longitude: ' + location.lng()
    });
    infowindow.open(map,marker);
} 