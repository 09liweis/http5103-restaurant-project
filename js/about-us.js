/* author: Wei Gao
   date: 12/03/2016
   I created a few functionalities with Javascript for about-us page
*/   

window.onload = init;
var hidePar;
var showMore;
var showLess;
var showMoreWords;
var showLessWords;
var showLessButton;
var showMoreButton;
var slides;
var currentSlide = 0;
var slideInterval;
var delay = 1000;
var message = "Please wait";
var messageNow;
var messageThen;
function init(){
	hidePar = document.getElementById("hidePar");
	slides = document.querySelectorAll("#slides .slide");
	slideInterval = setInterval(nextSlide, 2000);
	showMore = document.getElementById("showMore");
	showLess = document.getElementById("showLess");
	showMoreButton = document.getElementById("showMoreButton");
	showLessButton = document.getElementById("showLessButton");
	messageNow = document.getElementById("messageNow");
	messageThen = document.getElementById("messageThen");
	showMoreWords = messageNow.innerHTML;
	showLessWords = messageThen.innerHTML;
	showMoreButton.onclick = showMorePar;
	showLessButton.onclick = showLessPar;
}

/* This function allows us to perform the slideshow every 2 seconds */
function nextSlide() {
	slides[currentSlide].className = "slide";
	currentSlide = (currentSlide+1)%slides.length;
	slides[currentSlide].className = "slide showing";
}

/* It calls another function to show more content when a user clicks the "show more" button,
   however, it also provides a delay of 1000 seconds and the button's content is changed to
   "Please wait" in the meantime */
function showMorePar(){
	messageNow.innerHTML = message;
	setTimeout(showMoreParNow, delay);
}

/* It calls another function to show less content when a user clicks the "show less" button,
   however, it also provides a delay of 1000 seconds and the button's content is changed to
   "Please wait" in the meantime */
function showLessPar(){
	messageThen.innerHTML = message;
	setTimeout(showLessParNow, delay);
}

// It shows more content and the "show less" button, also hides the "show more" button.
function showMoreParNow(){
	showMore.style.display = "none";
	hidePar.style.display = "block";
	showLess.style.display = "inline-block";
	messageThen.innerHTML = showLessWords;
}

// It shows less content and the "show more" button, , also hides the "show less" button.
function showLessParNow(){
	showLess.style.display = "none";
	hidePar.style.display = "none";
	showMore.style.display = "inline-block";
	messageNow.innerHTML = showMoreWords;
}
