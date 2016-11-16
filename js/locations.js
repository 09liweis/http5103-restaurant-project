var map;
var restaurants = [
    {
        name: 'restaurant-1',
        lat: 43.567,
        lng: -79.4567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/tHTHup3YTN6XsLwf43vY_IMG_8003-300x300.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-2',
        lat: 43.667,
        lng: -79.2567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/tHTHup3YTN6XsLwf43vY_IMG_8003-300x300.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-3',
        lat: 43.167,
        lng: -79.8567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/tHTHup3YTN6XsLwf43vY_IMG_8003-300x300.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-4',
        lat: 43.567,
        lng: -79.3567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/tHTHup3YTN6XsLwf43vY_IMG_8003-300x300.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-5',
        lat: 43.067,
        lng: -79.567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/tHTHup3YTN6XsLwf43vY_IMG_8003-300x300.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-1',
        lat: 43.367,
        lng: -79.2567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/tHTHup3YTN6XsLwf43vY_IMG_8003-300x300.jpg',
        cost: '$$',
        rating: 8
    },
];
var college = {lat: 43.7283324, lng: -79.6079205}
var markers = [];
var infos = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: college,
        zoom: 9,
        scrollwheel: false,
    });
    
    restaurants.map(function(r) {
        var marker = new google.maps.Marker({
            position: {lat: r.lat, lng: r.lng},
            map: map,
            animation: google.maps.Animation.DROP,
        });
        
        markers.push(marker);
        
        var info = new google.maps.InfoWindow({
            content: '<div class="res-popup">' +
                        '<div class="res-image"><img src="' + r.photo + '" /></div>' +
                        '<div class="res-info">' +
                            '<h3>' + r.name + '</h3>' +
                        '</div>' +
                     '</div>',
            maxWidth: 400,
            custom: true
        })
        
        infos.push(info);
        
        marker.addListener('click', function() {
            closeOtherInfos();
            info.open(map, this);
        })
    })
}

function closeOtherInfos() {
    var numInfos = infos.length;
    for (var i = 0; i < numInfos; i++) {
        infos[i].close();
    }
}