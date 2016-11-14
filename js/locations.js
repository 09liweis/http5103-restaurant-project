var map;
var college = {lat: 43.7283324, lng: -79.6079205}
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: college,
        zoom: 19,
        scrollwheel: false,
    });
    
    var marker = new google.maps.Marker({
        position: college,
        map: map
    });
}