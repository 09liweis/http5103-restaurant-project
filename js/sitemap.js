/* Author: Wei Gao
   Date: 12/04/2016
   I created a few functionalities with JQuery for the sitemap page.
*/

$(document).ready(function(){
	/* It either hides or shows the unordered list next to the h3 tag when you click on the header tag.
	*/
	$("h3").click(function(){
		$(this).next("ul").slideToggle();
	});
	/* It performs a simple animation of moving the text "redirecting..." by 5px to the right
	   on the current page before redirecting the user to another page after a user clicks a link.
	 */
	$("a").click(function(e){
		e.preventDefault();
		var href = $(this).attr("href");
		var message = "redirecting..."
		$(this).text(message);
		$(this).animate({
		   'marginLeft' : "+=5px"
		}, 'slow', function(){
			window.location.href = href;
		});
	});
});

