/*-- Summary: Contest Page with a rigged contest --*/
/*-- Comment: Contest Page JavaScript File       --*/
/*-- Created: by Irfaan Auhammad on 22-Nov-2016  --*/

// When page loads
window.onload = function() {
	
	// Define a card object (constructor) and then create multiple instances of it
	var objCard = function(x,y, objImg) {
		this.x = x,
		this.y = y,
		this.face = objImg.img,
		this.cardType = objImg.cardType,
		this.faceDown = true,
		this.width = 100
	}
	
	var canvas_image = new Image();
	canvas_image.src = "images/contest/minions.png";
	
	// CONSTANTS REPRESENTING CARDS TYPE
	var sTYPE_BOMB = "BOMB";
	var sTYPE_GOLD = "GOLD";
	var sTYPE_SILVER = "SILVER";
	var sTYPE_BRONZE = "BRONZE";
	
	// Global variables to keep track of cards counter
	var iNbFlippedBomb = 0;
	var iNbFlippedGold = 0;
	var iNbFlippedSilver = 0;
	var iNbFlippedBronze = 0;
	var iNbAttemptsLeft = 3;
	var iNbAttemptsMade = 0;
	
	// Four types of images to add to cards
	var imgBomb = new Image();
	var imgBronze = new Image();
	var imgSilver = new Image();
	var imgGold = new Image();
	
	// Counter elements on DOM
	var displayNbBronze = document.getElementById("bronze");
	var displayNbSilver = document.getElementById("silver");
	var displayNbGold = document.getElementById("gold");
	var displayNbBomb = document.getElementById("bomb");
	var displayNbAttempts = document.getElementById("attempt-left");
	var displayGameOverMsg = document.getElementById("userInfo");
	var displayRoundInfo = document.getElementById("roundInfo");
	var displayRoundNumb = document.getElementById("try-number");
	
	// Get the images source	
	imgBomb.src = "images/contest/bomb.png";
	imgBronze.src = "images/contest/bronzeStar.png";
	imgSilver.src = "images/contest/silverStar.png";
	imgGold.src = "images/contest/goldStar.png";
		
	var objBomb = {img:imgBomb, cardType:sTYPE_BOMB};
	var objBronze = {img:imgBronze, cardType:sTYPE_BRONZE};
	var objSilver = {img:imgSilver, cardType:sTYPE_SILVER};
	var objGold = {img:imgGold, cardType:sTYPE_GOLD};
	
	
	// ### FUNCTIONS ###
	// -----------------
	// Add drawCardFaceDown method to card object
	objCard.prototype.drawCardFaceDown = function() {
		myCanvas.beginPath();
		myCanvas.rect(this.x, this.y, this.width, this.width, 10);
		myCanvas.fillStyle = "#72C3E8";
		myCanvas.fill();
		this.faceDown = true;
	};
	
	// Add drawCardFaceUp method to card object
	objCard.prototype.drawCardFaceUp = function() {
		myCanvas.beginPath();
		myCanvas.rect(this.x, this.y, this.width, this.width, 10);
		myCanvas.fillStyle = "#867EFF";
		myCanvas.fill();
		this.faceDown = false;
	}
	
	// Add drawGenericPicture method to card object
	objCard.prototype.drawGenericPicture = function() {
		myCanvas.drawImage(canvas_image, this.x, this.y, this.width, this.width);
	}
	
	// Add drawFaceUpPicture method to card object
	objCard.prototype.drawFaceUpPicture = function() {
		myCanvas.drawImage(this.face, this.x, this.y, this.width, this.width);
	}
	
	// Add isUnderMouse to verify if mouse clicked on a card
	objCard.prototype.isUnderMouse = function(coordX, coordY) {
		if (coordX >= this.x && 
			coordX <= (this.x + this.width) && 
			coordY >= this.y && 
			coordY <= (this.y + this.width)) {
				
			return true;
			
		}else {
			return false;
		}
	};
	
	// Function to shuffle an array
	function shuffleArray(array){
		var currentIndex = array.length, tempValue, randomIndex;
		// While there remains element to shuffle
		while(0 !== currentIndex){
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			// Swap the element with the current element
			tempValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = tempValue;
		}
		return array;
	}
	
	// Function to flip a card
	function flipACard() {
		// Get X & Y coordinates of mouse click relative to canvas top
		var canvasBorder = Canvas.getBoundingClientRect();
		var actualX = event.clientX - canvasBorder.left;
		var actualY = event.clientY - canvasBorder.top;
		
		// Loop on card array to check if any card is clicked and draw face up
		for (var i = 0; i < lstCards.length; i++) {
			if (lstCards[i].isUnderMouse(actualX, actualY) === true && 
				lstCards[i].faceDown === true) {
					
				lstCards[i].drawCardFaceUp();
				lstCards[i].drawFaceUpPicture();
				
				// Increment counter
				switch (lstCards[i].cardType) {
					case sTYPE_BOMB:
						lstBirdsBombs[iNbFlippedBomb].classList.remove("invisible");
						iNbFlippedBomb += 1;
						displayNbBomb.innerHTML = iNbFlippedBomb;
						break;
						
					case sTYPE_GOLD:
						lstStarsGold[iNbFlippedGold].classList.remove("invisible");
						iNbFlippedGold += 1;
						displayNbGold.innerHTML = iNbFlippedGold;
						break;
						
					case sTYPE_SILVER:
						lstStarsSilver[iNbFlippedSilver].classList.remove("invisible");
						iNbFlippedSilver += 1;
						displayNbSilver.innerHTML = iNbFlippedSilver;
						break;
						
					case sTYPE_BRONZE:
						lstStarsBronze[iNbFlippedBronze].classList.remove("invisible");
						iNbFlippedBronze += 1;
						displayNbBronze.innerHTML = iNbFlippedBronze;
						break;
				}
				
				// Call function to check if game over
				var tCheckGameOver = setTimeout(function(){
					if (iNbFlippedBomb === 5) {
						roundOver();
					}
				}, 500);
				
				return;	// Prevents further loop iteration when card found
			}
		}
	}
	
	// Function to draw cards face down on the canvas
	function drawCardsFaceDown() {
		// Loop through cards and call their drawing method
		for (var i = 0; i < lstCards.length; i++) {
			lstCards[i].drawCardFaceDown();
		}
		// Then, call the method to draw the generic picture on the back
		for (var i = 0; i < lstCards.length; i++) {
			lstCards[i].drawGenericPicture();
		}
	}
	
	// Function to initialise the interface when page loads
	function pageLoad() {
		
		// Shuffle and re-distribute cards
		resetDeckCards();
		
		// Add click event on 'New Game' & 'New Round' buttons
		btnNewGame.onclick = newGame;
		btnNewRound.onclick = newRound;
		
		// Disable 'New Round' buttons
		btnNewRound.disabled = true;
		
		// If user try to click on cards, focus on new game
		Canvas.onclick = focusNewGame;
		
	} // end of page load function
	
	// Focus on new game button
	function focusNewGame() {
		btnNewGame.focus();
	}
	
	// Focus on new round button
	function focusNewRound() {
		btnNewRound.focus();
	}
	
	// Function to start the game when click 'New Game' button
	function newGame() {
		// Disable 'New Game' button and enable 'New Round'
		btnNewGame.disabled = true;
		btnNewRound.disabled = false;
		
		// Decrement number of attempts
		refreshNbAttempts(-1);
				
		// Hide stars and bombs
		resetDrawMeter();
				
		// Increment attempt made and display to user
		informUserAbtRound();
		
		// Add listener to the canvas after information message
		var tTimerAgain = setTimeout(function(){
			Canvas.onclick = flipACard;
		}, 2100);
	}
	
	// Function to clean score panel before each round
	function resetDrawMeter() {
		// Hide all bronze stars
		for (var i = 0; i < lstStarsBronze.length; i++) {
			// Use of property 'invisible' to have the space preserve
			lstStarsBronze[i].classList.add("invisible");
		}
		// Hide all silver stars
		for (var i = 0; i < lstStarsSilver.length; i++) {
			// Use of property 'invisible' to have the space preserve
			lstStarsSilver[i].classList.add("invisible");
		}
		// Hide all gold stars
		for (var i = 0; i < lstStarsGold.length; i++) {
			// Use of property 'invisible' to have the space preserve
			lstStarsGold[i].classList.add("invisible");
		}
		// Hide all bombs
		for (var i = 0; i < lstBirdsBombs.length; i++) {
			// Use of property 'invisible' to have the space preserve
			lstBirdsBombs[i].classList.add("invisible");
		}
		
		// Reset counters and display updated values
		iNbFlippedBronze = 0;
		iNbFlippedSilver = 0;
		iNbFlippedGold = 0;
		iNbFlippedBomb = 0;
		
		displayNbBronze.innerHTML = iNbFlippedBronze;
		displayNbSilver.innerHTML = iNbFlippedSilver;
		displayNbGold.innerHTML = iNbFlippedGold;
		displayNbBomb.innerHTML = iNbFlippedBomb;
		
	}
	
	// Function to update number of attempts
	function refreshNbAttempts(addOrRemove) {
		// Increment or decrement
		iNbAttemptsLeft += addOrRemove;
		
		// Display new number of attempts left
		displayNbAttempts.innerHTML = iNbAttemptsLeft;
	}
	
	// Function to start a new round
	function newRound() {
		var userConfirmNewRound = true;
		
		// Confirm user for his action
		if (iNbFlippedBomb < 5) {
			userConfirmNewRound = confirm("Are you sure you want to forfeit this round?");
		}
		if (userConfirmNewRound === true) {
			if (iNbAttemptsLeft > 0){
				// Decrement number of attempts
				refreshNbAttempts(-1);
			
				// Reset score panel
				resetDrawMeter();
			
				// Shuffle and re-distribute cards
				resetDeckCards();
			
				// Hide busted message
				displayGameOverMsg.classList.add("invisible");
				
				// Remove focus
				btnNewRound.blur();
				
				// Inform user about new round
				informUserAbtRound();
								
				// Add listener on canvas to allow flip cards again
				var tTimerAgain = setTimeout(function(){
					Canvas.onclick = flipACard;
				}, 2100);
				
			} else {
				roundOver();
			}
		}
	}
	
	// Function called when round over
	function roundOver() {
		
		if (iNbAttemptsLeft === 0) {
			btnNewRound.disabled = true;
			displayGameOverMsg.innerHTML = "Aww. You got busted! You are out of rounds! Better luck next time ...";
			Canvas.onclick = null;	// Remove flipCard listener
			btnNewRound.disabled = true;
			
		} else {
			Canvas.onclick = focusNewRound;
			displayGameOverMsg.onclick = focusNewRound;
		}
		displayGameOverMsg.classList.remove("invisible");
		
	}
	
	// Function to shuffle and distribute cards
	function resetDeckCards() {
		
		// Add the possible images to an array
		lstPossibleImages = [objBronze, objBronze,
							 objSilver, objSilver, objSilver,
							 objGold, objGold, objGold, objGold];
		while (lstPossibleImages.length < 20){
			lstPossibleImages.push(objBomb); // Fill the rest with angry birds
		}
		
		// Shuffle array to randomise cards positions
		lstPossibleImages = shuffleArray(lstPossibleImages);
		
		// Generate coordinates of the grid to place the cards
		// Outer loop will generate columns and inner loop will generate rows
		lstCards = [];
		var iNUM_COLS = 5;
		var iNUM_ROWS = 4;
		for (var i = 0; i < iNUM_COLS; i++) {
			for (var j = 0; j < iNUM_ROWS; j++) {
				 lstCards.push(new objCard(i * 108 + 10, j * 108 + 10,
										   lstPossibleImages.pop()));
			}
		}
		
		// Draw the cards face down on canvas
		drawCardsFaceDown();
		
	}
	
	// Function to display round number to user
	function informUserAbtRound() {
		
		// Increment round attempt
		iNbAttemptsMade ++;
				
		// Update round number in html
		displayRoundNumb.innerHTML = iNbAttemptsMade;
		
		// Display the information box
		displayRoundInfo.classList.remove("invisible");
		
		// Hide information box after 3 seconds
		var tTimer = setTimeout(function(){
			displayRoundInfo.classList.add("invisible");
		}, 2000);
	}
	
	
	/*=== MAIN EXECUTION STARTS HERE ===*/
	/*----------------------------------*/
	// Variables declaration
	var lstPossibleImages;
	var btnNewGame = document.getElementById("btn_newGame");
	var btnNewRound = document.getElementById("btn_newRound");
	
	// Get list of gold, silver and bronze stars and bombs
	var lstStarsBronze = document.getElementById("bronze-stars").children;
	var lstStarsSilver = document.getElementById("silver-stars").children;
	var lstStarsGold = document.getElementById("gold-stars").children;
	var lstBirdsBombs = document.getElementById("bombs").children;
    
	// Initialisation of an empty array of cards
	var lstCards;
	var Canvas = document.getElementById("myCanvas");
	var myCanvas = Canvas.getContext("2d");
	
	// Call pageLoad() function to initialise interface
	pageLoad();
	
}	// end of onload wrapper