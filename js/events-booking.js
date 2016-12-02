var events = [
    {
        name: 'Kid birthday',
        date: '2016-11-12',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'images/events/food-restaurant-fruits-orange.jpg',
    },
    {
        name: 'Team project celebration',
        date: '2016-12-15',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'images/events/pexels-photo-26906.jpg',
    },
    {
        name: 'Exam done celebration',
        date: '2016-12-12',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'images/events/pexels-photo-27642.jpg',
    },
    {
        name: 'Digital design Final Project celebration',
        date: '2016-12-15',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'images/events/pexels-photo-92090.jpeg',
    },
    {
        name: 'Sam\'s birthday',
        date: '2016-12-16',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'images/events/pexels-photo-127431.jpeg',
    },
    {
        name: 'Christmax Party',
        date: '2016-12-25',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'images/events/restaurant-coffee-chocolate-dessert.jpg',
    },
];

window.onload = function() {
    
    renderDate();
    renderTime();
    
    $('#events-list').html(renderEvents(events));
    
    $('#book-event').click(function() {
        $('#events-list').hide('fast');
        $('#eventform').show('fast');
        $('#book-event').hide('fast');
        $('#back-to-list').show('fast');
    });
    
    $('#back-to-list').click(function() {
        $('#events-list').show('fast');
        $('#eventform').hide('fast');
        $('#back-to-list').hide('fast');
        $('#book-event').show('fast');
    });
    
    $('#start-time').change(function() {
        $('#end-time-form').show('fast');
    });
}

function renderEvents(events) {
    var eventsHTML = '';
    events.map(function(event) {
        eventsHTML += renderEvent(event);
    });
    eventsHTML += '<div class="clear"></div>';
    return eventsHTML;
}

function renderEvent(event) {
    var date = new Date();
    var format = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var expird = (format > event.date) ? '<div class="label">expird</div>' : '';
    return '<div class="event col">' +
                '<div class="event-image" style="background-image: url(' + event.photo + ')">' +
                    expird +
                    //'<img src="' + event.photo + '" />' +
                '</div>' +
                '<div class="event-info">' +
                    '<h3>' + event.name + '</h3>' +
                    '<p><i class="fa fa-calendar"></i>' + event.date + '</p>' +
                    '<p><i class="fa fa-clock-o"></i>' + event.startTime + ' - ' + event.endTime + '</p>' +
                '</div>' +
            '</div>';
}

function renderDate() {
    var date = new Date();
    var dates = '<option class="form-input">Please select a date</option>';
    for (var i = date.getDate(); i <= 31; i++) {
        var value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + i;
        dates += '<option class="form-input" value="' + value + '">' + value + '</option>';
    }
    $('#date').html(dates);
}

function renderTime() {
    var date = new Date();
    var times = '<option>Select start time</option>';
    for (var h = date.getHours(); h < 24; h++) {
        var value;
        if (h < 13) {
            value = h + ':00am';
        } else {
            value = (h - 12) + ':00pm';
        }
        times += '<option value="' + value + '">' + value + '</option>';
    }
    $('#start-time').html(times);
}