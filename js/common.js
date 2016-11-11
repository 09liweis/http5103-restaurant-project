var navs = [
    {
        link: '/',
        name: 'home',
    },
    {
        link: 'about-us.html',
        name: 'about us',
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
header.innerHTML = '<div id="heading">' +
                        '<div class="wrapper">' +
                            '<div class="col" id="contact">' +
                                '<p id="address">205 Humber College Blvd, Etobicoke, ON M9W 5L7</p>' +
                                '<p id="phone">(111)111-111</p>' +
                            '</div>' +
                            '<div class="col" id="logo">' +
                                '<h1>Restaurant</h1>' +
                            '</div>' +
                            '<div class="col" id="socials">' +
                                '<ul>' +
                                    '<li>facebook</li>' +
                                    '<li>facebook</li>' +
                                    '<li>facebook</li>' +
                                    '<li>facebook</li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="clear"></div>' +
                        '</div>' +
                    '</div>' +
                    '<nav id="nav">' +
                        '<div class="wrapper">' +
                            '<ul>' +
                            navigations +
                            '</ul>' +
                        '</div>' +
                    '</nav>';

var footer = document.getElementById('footer');
footer.innerHTML = '<div class="wrapper">' +
                        '<p>Copyright &copy; 2016 Restaurant</p>';
                    '</div>';