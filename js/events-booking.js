// list of events
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
        name: 'JS Final Exam celebration',
        date: '2016-12-14',
        startTime: '8:00pm',
        endTime: '10:00pm',
        description: 'Event description',
        photo: 'images/events/pexels-photo-92090.jpeg',
    },
    {
        name: 'Exam done celebration',
        date: '2016-12-15',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'images/events/pexels-photo-27642.jpg',
    },
    {
        name: 'Team project celebration',
        date: '2016-12-16',
        startTime: '2:00pm',
        endTime: '6:00pm',
        description: 'Event description',
        photo: 'images/events/pexels-photo-26906.jpg',
    },
    {
        name: 'Sam\'s birthday',
        date: '2016-12-16',
        startTime: '8:00pm',
        endTime: '10:00pm',
        description: 'Event description',
        photo: 'images/events/pexels-photo-127431.jpeg',
    },
    {
        name: 'Christmax Party',
        date: '2016-12-25',
        startTime: '6:00pm',
        endTime: '10:00pm',
        description: 'Event description',
        photo: 'images/events/restaurant-coffee-chocolate-dessert.jpg',
    },
];

window.onload = function() {
    //render dynamic date and time for event booking
    renderDate();
    renderStartTime();
    
    if (location.search == '?form') {
        renderForm();
    }
    
    //render events
    $('#events-list').html(renderEvents(events));
    
    $('#book-event').click(function() {
        renderForm();
    });
    
    $('#back-to-list').click(function() {
        renderList();
    });
    
    $('#start-time').change(function() {
        renderEndTime();
    });
    
    $('#eventform').submit(function() {
        event.preventDefault();
        var name = $('#name').val();
        var date = $('#date').val();
        var startTime = $('#start-time').val();
        var endTime = $('#end-time').val();
        var description = $('#description').val();
        
        $('#name, #date, #start-time, #end-time, #description').removeClass('input-error');
        
        if (name.trim() == '') {
            displayError('#name');
            return false;
        }
        
        if (date == '') {
            displayError('#date');
            return false;
        }
        
        if (startTime == '') {
            displayError('#start-time');
            return false;
        }
        
        if (endTime == '') {
            displayError('#end-time');
            return false;
        }
        
        if (description.trim() == '') {
            displayError('#description');
            return false;
        }
        
        $('#msg').removeClass('error').addClass('success').html('The event request has been submitted');
        
    });
}

function displayError(input) {
    $(input).addClass('input-error');
    $('#msg').addClass('error').html('You must fill out every field');
}

function renderForm() {
    $('#events-list').hide('fast');
    $('#eventform').show('fast');
    $('#book-event').hide('fast');
    $('#back-to-list').show('fast');
}

function renderList() {
    $('#events-list').show('fast');
    $('#eventform').hide('fast');
    $('#back-to-list').hide('fast');
    $('#book-event').show('fast');
}

//function to render events
function renderEvents(events) {
    var eventsHTML = '';
    events.map(function(event) {
        eventsHTML += renderEvent(event);
    });
    eventsHTML += '<div class="clear"></div>';
    return eventsHTML;
}


//function to render single event
function renderEvent(event) {
    var date = new Date();
    var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    var format = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day;
    // compare current date with event date to check expird event
    var expird = (format > event.date) ? '<div class="label">Expird</div>' : '';
    return '<div class="event col">' +
                '<div class="event-image" style="background-image: url(' + event.photo + ')">' +
                    expird +
                '</div>' +
                '<div class="event-info">' +
                    '<h3 class="event-title">' + event.name + '</h3>' +
                    '<p><i class="fa fa-calendar"></i>' + event.date + '</p>' +
                    '<p><i class="fa fa-clock-o"></i>' + event.startTime + ' - ' + event.endTime + '</p>' +
                '</div>' +
            '</div>';
}

//function to render future dates
function renderDate() {
    var date = new Date();
    var dates = '';
    for (var i = date.getDate(); i <= 31; i++) {
        var value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ((i < 10) ? '0' + i: i);
        dates += '<option class="form-input" value="' + value + '">' + value + '</option>';
    }
    $('#date').append(dates);
}

//function to render future time
function renderStartTime() {
    var date = new Date();
    var times = '';
    times += renderTime(date.getHours());
    $('#start-time').append(times);
}

//function to render dynamic end time
function renderEndTime() {
    var start = $('#start-time').val();
    var times = '';
    times += renderTime(parseInt(start) + 1);
    $('#end-time').append(times);
    $('#end-time-form').show('fast');
}

//generate time
function renderTime(start) {
    var times;
    for (var h = start; h < 24; h++) {
        var value = convert24to12(h)
        
        times += '<option value="' + h + '">' + value + '</option>';
    }
    return times
}

//convert 24 hour to 12 hour format
function convert24to12(h) {
    var value;
    if (h < 13) {
        value = h + ':00am';
    } else {
        value = (h - 12) + ':00pm';
    }
    return value;
}