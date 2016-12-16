//Author: Ivan Moruhyi
//Technologies Used: Vanilla Javascript
window.onload = function() {
    //Looks similar to constructor function, but not quite. The idea is that I wanted to create a carousel using this function, but some of the properties should not be accessible through the constructed carousel object.
    //This function takes 2 parameters: slidesArray - array with slides, slidesIndicatorsArray - array of circles which indicate current slide.
    var carouselConstructor = function (slidesArray, slidesIndicatorsArray) {
        var carousel = {}; //carousel object
        
        //These should not be accessible through the carousel object
        var currentSlide = 0;
        var slides = slidesArray;
        var slideIndicators = slidesIndicatorsArray;
        
        //nextSlide function handles changing to next slide.
        carousel.nextSlide = function() {
            slideIndicators[currentSlide].style.borderColor = '#fff';
            slides[currentSlide].classList.toggle('hidden');
            if (currentSlide === slides.length - 1) {
                currentSlide = 0;
                slides[currentSlide].classList.toggle('hidden');
            } else {
                currentSlide++;
                slides[currentSlide].classList.toggle('hidden');
            }
            slideIndicators[currentSlide].style.borderColor = '#ffb606';
        };
        //prevSlide function handles changing to previous slide.
        carousel.prevSlide = function() {
            slideIndicators[currentSlide].style.borderColor = '#fff';
            slides[currentSlide].classList.toggle('hidden');
            if (currentSlide === 0) {
                currentSlide = slides.length - 1;
                slides[currentSlide].classList.toggle('hidden');
            } else {
                currentSlide--;
                slides[currentSlide].classList.toggle('hidden');
            }
            slideIndicators[currentSlide].style.borderColor = '#ffb606'; 
        };
        //clicking on a certain indicator (small circle) should give an image associated with that indicator. requestImage function handles this situation.
        carousel.requestImage = function(imageNum) {
            function showImage(imageNum) {
                for (var i = 0; i < slideIndicators.length; ++i) {
                    slideIndicators[i].style.borderColor = 'white';
                    slides[i].classList.remove('hidden');
                    slides[i].classList.toggle('hidden');
                }
                slides[imageNum].classList.toggle('hidden');
                slideIndicators[imageNum].style.borderColor = '#ffb606';
                currentSlide = imageNum;
            }
            return function() {
                showImage(imageNum);
            }
        }
        //assigning onclick event for each indicator (small circle)
        for (var i = 0; i < slideIndicators.length; ++i) {
            slideIndicators[i].onclick = carousel.requestImage(i);
        }
        //initial setup. all slides but first must be hidden initially.
        for (var i = 0; i < slides.length; ++i) {
            if (i !== 0) {
                slides[i].classList.toggle('hidden');
            }
        }
        
        slideIndicators[currentSlide].style.borderColor = '#ffb606';
        return carousel;
    };
    //constructing object - carouselHome, which represents carousel on home page.
    var carouselHome = carouselConstructor(document.querySelectorAll("#slides li"),document.querySelectorAll("#timer-indicators div"));
    
    //changing carousel slide every 10 seconds.
    var slideInterval = setInterval(carouselHome.nextSlide, 10000);
    
    var rightArrow = document.querySelector('.right-arrow');
    var leftArrow = document.querySelector('.left-arrow');
    //onclick events for left and rright arrows.
    rightArrow.onclick = carouselHome.nextSlide;
    leftArrow.onclick = carouselHome.prevSlide;
    
    
    /*BOOK A TABLE FORM*/
    //later I'm using information from Date object to dates, when I can book a table. I'm using only tommorow and day after tommorow.
    var curDate = new Date();
    curDate.setDate(curDate.getDate() + 1);
    var nextDayDate = curDate.toDateString();
    curDate.setDate(curDate.getDate() + 1);
    var nextNextDayDate = curDate.toDateString();
    
    //get all necessary elements to later process validation
    var timeCh = document.getElementById('Utime');
    var dateCh = document.getElementById('Udate');
    var peopleCh = document.getElementById('Upeople');
    var outMsg = document.getElementById('msgBook');
    
    //populate element (date) with tommorow's date and day after tommorow's date.
    document.querySelector('#Udate option:nth-child(2)').innerHTML = nextDayDate;
    document.querySelector('#Udate option:nth-child(3)').innerHTML = nextNextDayDate;
    
    //form validation
    var tableB = document.forms[0];
    tableB.onsubmit = function() {
        if (timeCh.value === 'noTime') {
            timeCh.style.border = '1px solid red';
            outMsg.innerHTML = 'Make a selection please';
            outMsg.classList.remove('hidden');
            return false;
        } else {
            timeCh.style.border = '1px solid #aaaaaa';
            outMsg.classList.remove('hidden');
            outMsg.classList.add('hidden');
        }
        
        if (dateCh.value === 'noDate') {
            dateCh.style.border = '1px solid red';
            outMsg.innerHTML = 'Make a selection please';
            outMsg.classList.remove('hidden');
            return false;
        } else {
            dateCh.style.border = '1px solid #aaaaaa';
            outMsg.classList.remove('hidden');
            outMsg.classList.add('hidden');
        }
        outMsg.classList.remove('hidden');
        outMsg.innerHTML = 'Thank you for booking. You will get a notification soon.'
        var msgTimeout = setTimeout(delMsg, 5000);
        function delMsg() {
            outMsg.innerHTML = "";
        }
        return false;
    }
    
    /*NEWSLETTER FORM*/
    var newsL = document.forms[1];
    var msg = document.querySelector('#newsletter p');
    newsL.onsubmit = function() {
        if (newsL.uEmail.value === '') {
            newsL.uEmail.style.border = '1px solid red';
            msg.classList.remove('hidden');
            msg.innerHTML = 'Enter correct email please.';
            return false;
        } else {
            msg.classList.remove('hidden');
            msg.classList.add('hidden');
            newsL.uEmail.style.border = 'none';
        }
        msg.classList.remove('hidden');
        msg.innerHTML = 'Thank you for subscription';
        var msgTimeout = setTimeout(delMsg, 5000);
        function delMsg() {
            msg.innerHTML = "";
        }
        return false;
    }
    
}