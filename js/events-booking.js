var events = [
    {
        name: 'Kid birthday',
        date: '2016-11-12',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26059567%2F66713630167%2F1%2Foriginal.jpg?h=140&w=280&rect=0%2C110%2C1346%2C673&s=53bb205cc3eed1d38c934098df7171e9',
    },
    {
        name: 'Team project celebration',
        date: '2016-12-15',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26059567%2F66713630167%2F1%2Foriginal.jpg?h=140&w=280&rect=0%2C110%2C1346%2C673&s=53bb205cc3eed1d38c934098df7171e9',
    },
    {
        name: 'Exam done celebration',
        date: '2016-12-12',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26059567%2F66713630167%2F1%2Foriginal.jpg?h=140&w=280&rect=0%2C110%2C1346%2C673&s=53bb205cc3eed1d38c934098df7171e9',
    },
    {
        name: 'Digital design Final Project celebration',
        date: '2016-12-15',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26059567%2F66713630167%2F1%2Foriginal.jpg?h=140&w=280&rect=0%2C110%2C1346%2C673&s=53bb205cc3eed1d38c934098df7171e9',
    },
    {
        name: 'Sam\'s birthday',
        date: '2016-12-16',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26059567%2F66713630167%2F1%2Foriginal.jpg?h=140&w=280&rect=0%2C110%2C1346%2C673&s=53bb205cc3eed1d38c934098df7171e9',
    },
    {
        name: 'Christmax Party',
        date: '2016-12-25',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26059567%2F66713630167%2F1%2Foriginal.jpg?h=140&w=280&rect=0%2C110%2C1346%2C673&s=53bb205cc3eed1d38c934098df7171e9',
    },
];

window.onload = function() {
    
    $('#events-list').html(renderEvents(events));
    
    $('#book-event').click(function() {
        $('#events-list').hide('slow');
        $('#eventform').show('slow');
        $('#book-event').hide('slow');
        $('#back-to-list').show('slow');
    });
    
    $('#back-to-list').click(function() {
        $('#events-list').show('slow');
        $('#eventform').hide('slow');
        $('#back-to-list').hide('slow');
        $('#book-event').show('slow');
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
                '<div class="event-image">' +
                    expird +
                    '<img src="' + event.photo + '" />' +
                '</div>' +
                '<div class="event-info">' +
                    '<h3>' + event.name + '</h3>' +
                    '<p><i class="fa fa-calendar"></i>' + event.date + '</p>' +
                    '<p><i class="fa fa-clock-o"></i>' + event.startTime + ' - ' + event.endTime + '</p>' +
                '</div>' +
            '</div>';
}