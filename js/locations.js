var map;
//list of restaurants
var restaurants = [
    {
        id: 1,
        name: 'restaurant-1',
        lat: 43.7283515,
        lng: -79.6101083,
        address: 'somewhere',
        photo: 'images/locations/city-restaurant-lunch-outside.jpg',
        cost: '$$',
        rating: '5'
    },
    {
        id: 2,
        name: 'restaurant-2',
        lat: 43.7279994,
        lng: -79.6071043,
        address: 'somewhere',
        photo: 'images/locations/dinner-meal-table-wine.jpg',
        cost: '$$',
        rating: '4.5'
    },
    {
        id: 3,
        name: 'restaurant-3',
        lat: 43.7256537,
        lng: -79.6073304,
        address: 'somewhere',
        photo: 'images/locations/food-salad-restaurant-person.jpg',
        cost: '$$',
        rating: '4.8'
    },
    {
        id: 4,
        name: 'restaurant-4',
        lat: 43.7323522,
        lng: -79.609769,
        address: 'somewhere',
        photo: 'images/locations/menu-restaurant-vintage-table.jpg',
        cost: '$$',
        rating: '4.3'
    },
    {
        id: 5,
        name: 'restaurant-5',
        lat: 43.7245555,
        lng: -79.6193396,
        address: 'somewhere',
        photo: 'images/locations/pexels-photo-30503.jpg',
        cost: '$$',
        rating: '4.7'
    },
];

var center = {lat: 43.7283324, lng: -79.6079205}
var markers = [];
var infos = [];
//map initialization
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 15,
        scrollwheel: false,
    });
    
    //click on map to close all the open window info
    map.addListener('click', function() {
        closeOtherInfos();
    });
    
    //set markers for restaurants
    restaurants.map(function(r) {
        var marker = new google.maps.Marker({
            position: {lat: r.lat, lng: r.lng},
            map: map,
            icon: '../images/locations/map-marker.png',
            animation: google.maps.Animation.DROP,
            id: r.id
        });
        
        markers.push(marker);
        
        //set info window for restaurants on map
        var info = new google.maps.InfoWindow({
            content: '<div class="res-popup">' +
                        '<div class="res-image"><img src="' + r.photo + '" /></div>' +
                        '<div class="res-info">' +
                            '<h3>' + r.name + '</h3>' +
                        '</div>' +
                     '</div>',
            maxWidth: 400,
            custom: true,
            id: r.id,
        })
        
        infos.push(info);
        
        // restaurant markers click to show info window
        marker.addListener('click', function() {
            connectResMarker(this.id);
            closeOtherInfos();
            info.open(map, this);
        })
    })
}

window.onload = function() {
    
    $('#res-list').html(renderRestaurants(restaurants));
    
    //click restaurant to open infowindow on map
    $('.restaurant').click(function() {
        var id = $(this).attr('id');
        connectResMarker(id);
        closeOtherInfos();
        var info = findInfowindow(id);
        var marker = findMarker(id);
        info.open(map, marker);
    });
}

//bind restaurants and markers on map
function connectResMarker(id) {
    $('.restaurant').removeClass('active');
    $('#' + id).addClass('active');
    var container = $('#res-list');
    container.animate({
        //calculate to scroll restaurant
        scrollTop: $('#' + id).offset().top - container.offset().top + container.scrollTop()
    }, 1000);
}

// function to close all the open infowindow
function closeOtherInfos() {
    var numInfos = infos.length;
    for (var i = 0; i < numInfos; i++) {
        infos[i].close();
    }
}

//find marker base on restaurant id
function findMarker(id) {
    for (var i = 0; i < markers.length; i++) {
        if (id == markers[i].id) {
            return markers[i];
        }
    }
}

//return infowindow base on restaurant id
function findInfowindow(id) {
    for (var i = 0; i < infos.length; i++) {
        if (id == infos[i].id) {
            return infos[i];
        }
    }
}

//render restaurants 
function renderRestaurants(restaurants, options) {
    var reshtml = '';
    restaurants.map(function(r) {
        reshtml += renderRes(r);
    });
    reshtml += '<div class="clear"></div>';
    return reshtml;
}

//render single restaurant
function renderRes(res) {
    return '<div id="' + res.id + '" class="restaurant col">'+
                '<div class="res-image">' +
                    '<img src="' + res.photo + '" />' +
                '</div>' +
                '<div class="res-info">' +
                    '<h3 class="res-title">' + res.name + '</h3>' +
                    '<p>Rating: ' + renderRating(res.rating) + '</p>' +
                    '<p><span class="fa fa-dollar"></span>' + res.cost + '</p>' +
                '</div>' +
            '</div>'
}

function renderRating(rate) {
    var array = rate.split('.');
    var int = parseInt(array[0]);
    var ratings = ''
    for (var i = 0; i < int; i++) {
        ratings += '<span class="fa fa-star"></span>';
    }
    if (array.length > 1) {
        ratings += '<span class="fa fa-star-half"></span>';
    }
    return ratings;
}