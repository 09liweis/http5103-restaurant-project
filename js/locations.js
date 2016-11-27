var map;
var restaurants = [
    {
        name: 'restaurant-1',
        lat: 43.567,
        lng: -79.4567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/photo-1433155805822-ffc337821a5b-600x400.jpeg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-2',
        lat: 43.667,
        lng: -79.2567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/photo-1433155805822-ffc337821a5b-600x400.jpeg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-3',
        lat: 43.167,
        lng: -79.8567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/photo-1433155805822-ffc337821a5b-600x400.jpeg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-4',
        lat: 43.567,
        lng: -79.3567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/photo-1433155805822-ffc337821a5b-600x400.jpeg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-5',
        lat: 43.067,
        lng: -79.567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/photo-1433155805822-ffc337821a5b-600x400.jpeg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-1',
        lat: 43.367,
        lng: -79.2567,
        address: 'somewhere',
        photo: 'http://preview.byaviators.com/theme/superlist/wp-content/uploads/2015/10/photo-1433155805822-ffc337821a5b-600x400.jpeg',
        cost: '$$',
        rating: 8
    },
];

var list = document.getElementById('list');

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

renderRestaurants(restaurants);

function closeOtherInfos() {
    var numInfos = infos.length;
    for (var i = 0; i < numInfos; i++) {
        infos[i].close();
    }
}

function renderRestaurants(restaurants, options) {
    var reshtml = '';
    restaurants.map(function(r) {
        reshtml += renderRes(r);
    });
    reshtml += '<div class="clear"></div>';
    list.innerHTML = '';
    list.innerHTML = reshtml;
}

function renderRes(res) {
    return '<div class="restaurant col">'+
                '<div class="res-image">' +
                    '<img src="' + res.photo + '" />' +
                '</div>' +
                '<div class="res-info">' +
                    '<h3>' + res.name + '</h3>' +
                    '<p>Rating: ' + res.rating + '</p>' +
                    '<p>Cost: ' + res.cost + '</p>' +
                    '<p>Address: ' + res.address + '</p>' +
                '</div>' +
            '</div>'
}