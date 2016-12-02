var map;
var restaurants = [
    {
        name: 'restaurant-1',
        lat: 43.7283515,
        lng: -79.6101083,
        address: 'somewhere',
        photo: 'images/locations/city-restaurant-lunch-outside.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-2',
        lat: 43.7279994,
        lng: -79.6071043,
        address: 'somewhere',
        photo: 'images/locations/dinner-meal-table-wine.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-3',
        lat: 43.7256537,
        lng: -79.6073304,
        address: 'somewhere',
        photo: 'images/locations/food-salad-restaurant-person.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-4',
        lat: 43.7323522,
        lng: -79.609769,
        address: 'somewhere',
        photo: 'images/locations/menu-restaurant-vintage-table.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-5',
        lat: 43.7245555,
        lng: -79.6193396,
        address: 'somewhere',
        photo: 'images/locations/pexels-photo-30503.jpg',
        cost: '$$',
        rating: 8
    },
    {
        name: 'restaurant-1',
        lat: 43.7282305,
        lng: -79.6178161,
        address: 'somewhere',
        photo: 'images/locations/red-lunch-green-knolling.jpg',
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
        zoom: 15,
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

window.onload = function() {
    $('#res-list').html(renderRestaurants(restaurants));
    
    $('#show-map').click(function() {
        $('#show-map').addClass('active');
        $('#show-list').removeClass('active');
        
        $('#map').show('fast');
        $('#res-list').hide('fast');
    });
    
    $('#show-list').click(function() {
        $('#show-map').removeClass('active');
        $('#show-list').addClass('active');
        
        $('#map').hide('fast');
        $('#res-list').show('fast');
    })
}

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
    return reshtml;
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