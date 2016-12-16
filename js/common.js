var fontAwesome = document.createElement('link');
    fontAwesome.id = 'font-awesome';
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://use.fontawesome.com/1cf4c770b3.css';
    document.head.appendChild(fontAwesome);
    
var jQuery = document.createElement('script');
jQuery.type = 'text/javascript';
jQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js';

document.head.appendChild(jQuery);


var navs = [
    {
        link: 'index.html',
        name: 'home',
    },
    {
        link: 'menu.html',
        name: 'menu',
    },
    {
        link: 'daily-specials.html',
        name: 'daily specials',
    },
    {
        link: 'events-booking.html',
        name: 'events booking',
    },
    {
        link: 'gift-card.html',
        name: 'gift card',
    },
    {
        link: 'locations.html',
        name: 'locations',
    },
    {
        link: 'careers.html',
        name: 'careers',
    },
    {
        link: 'sitemap.html',
        name: 'sitemap',
    },
    {
        link: 'about-us.html',
        name: 'about us',
    },
    {
        link: 'contact-us.html',
        name: 'contact us',
    },
    {
        link: 'contest.html',
        name: 'contest',
    },
];

var navigations = '';
for (var i = 0; i < navs.length; i++) {
    navigations += '<li class="nav"><a class="nav-link" href="' + navs[i].link + '">' + navs[i].name +  '</a></li>';
}

var header = document.getElementById('header');
header.innerHTML = '<div class="wrapper">' +
                        '<div class="col" id="logo">' +
                            '<h2 id="logo-text">DJT Restaurant</h2>' +
                        '</div>' +
                        '<nav class="col" id="nav">' +
                            '<ul>' +
                            navigations +
                            '</ul>' +
                        '</nav>' +
                        '<div class="clear"></div>' +
                    '</div>';

var footer = document.getElementById('footer');
footer.innerHTML = '<div class="wrapper">' +
                        '<p><i class="fa fa-map-marker"></i></p>' +
                        '<p id="address">205 Humber College Blvd, Etobicoke, ON M9W 5L7</p>' +
                        '<p id="phone">Call: (111)111-111</p>' +
                        '<p>Copyright &copy; ' + new Date().getFullYear() + ' DJT Restaurant</p>' +
                    '</div>';