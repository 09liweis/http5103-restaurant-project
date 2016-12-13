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
var tab1;
var tab2;
var tab3;
var rest;
/* This function is based on the code at the webpage - https://jqueryui.com/tabs 
 date: 12/10/2016*/
$(function() {
	$("#tabs").tabs({
		activate: function (event, ui) {
			//adjust the css of each tab since the content of each section is different
			if(ui.newTab.index() == 1 || ui.newTab.index() == 2){
				$("#rest").css('margin-top', '0');
				$("#tabs").css('margin-bottom', '0');
				$("#tabs").css('padding-bottom', '0');
			}
			else{
				$("#rest").css('margin-top', "400px");
				$("#tabs").css('margin-bottom', '0.5em');
				$("#tabs").css('padding-bottom', '1em');
			}
		}
	});
});

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
	tab1 = document.getElementById("tabs-1");
	tab2 = document.getElementById("tabs-2");
	tab3 = document.getElementById("tabs-3");
	rest = document.getElementById("rest");
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



$( "#tabs" ).on( "tabsactivate", function(event, ui) {
	rest.style.marginTop = "0";
} );

$( "#tabs" ).on( "tabsactivate", function(event, ui) {
	rest.style.marginTop = "0";
} );

function addMargin(){
	alert("hahha1");
	rest.style.marginTop = "400px";
}

function reduceMargin(){
	alert("hahaha2");
	rest.style.marginTop = "0px";
}