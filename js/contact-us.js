/* =============== */
/* Contact Us Page */
/* =============== */

// Contact Message object
var objSenderMsg = {
    sSenderName: "",
    sEmailAdd: "",
    sPhoneNum: "",
    sLocation: "",
    sSubject: "",
    sMessage: ""
};

// List of top 10 reviews to display in sidebar
var lstTop10Reviews = [{sender: "Donny", reviewText: "Service was great and friendly while the ambiance was elegant."},
                       {sender: "Melkai", reviewText: "Food amazing and bar staff knew their stuff.Will be back and recommend to peeps."},
                       {sender: "Marion", reviewText: "My friend and I dined here on Friday night and it was delicious. Really like the warm feel of the place."},
                       {sender: "Andrea", reviewText: "Our dining experience last saturday was very pleasant, given the excellent attention of the Sammy, our server, who demonstrated his knowledge of the menu and the entire restaurant pholosophy."},
                       {sender: "Jennifer", reviewText: "This was our perfect last evening in this great restaurant with delicious food and extremely friendly service!"},
                       {sender: "David S", reviewText: "The service was very high standard and the food was exquisite. Great wine list (although not cheap)."},
                       {sender: "Anna B", reviewText: "Lovely welcome by host. Food cooked to perfection and well presented. Well done to all and hope to see you al again shortly."},
                       {sender: "Matty R", reviewText: "Amazing food, fantastic hospitality and such great ambience. The restaurant is an absolute must, no excuses!"},
                       {sender: "Richard Ben", reviewText: "The service was first rate and the dinner was excellent. A great night out."},
                       {sender: "Troy C", reviewText: "Have been to this restaurant a few times now, food is always excellent, service great, place is popular, prices are good and reasonable."}];
var currentReview = 0;
var nextReview = 1;

// Function wrapper
window.onload = function () {

    // Get form element and add listener to submit button
    var contactForm = document.forms.contact_form;
    contactForm.onsubmit = sendContactMessage;
    
    // Call function to display reviews on the sidebar
    rotateReviews();
    
    /*### FUNCTIONS DECLARATION ###*/
    
    // Function triggered when user send message
    // -----------------------------------------
    function sendContactMessage() {
    
        // Get field validation indicators
        // -------------------------------
        var noName = document.getElementById("no-name");
        var noEmail = document.getElementById("no-email");
        var noPhone = document.getElementById("wrong-phone");
        var noSubject = document.getElementById("no-subject");
        var noMessage = document.getElementById("no-msg");
        
        
        // Validate required fields from the form
        // --------------------------------------        
        // Validate Name
        if (contactForm.sender_name.value === "") {
            noName.style.display = "block";
            contactForm.sender_name.focus();
            showValidationError();
            return false;
        } else {
            objSenderMsg.sSenderName = contactForm.sender_name.value;
            noName.style.display = "none";
        }
        
        // Validate Email
        var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (contactForm.sender_email.value === "") {
            noEmail.innerHTML = "Please enter an email address.";
            noEmail.style.display = "block";
            contactForm.sender_email.focus();
            showValidationError();
            return false;
        } else if (!emailRegex.test(contactForm.sender_email.value)) {
            noEmail.innerHTML = "Please enter a valid email address.";
            noEmail.style.display = "block";
            contactForm.sender_email.focus();
            showValidationError();
            return false;
        } else {
            objSenderMsg.sEmailAdd = contactForm.sender_email.value;
            noEmail.style.display = "none";
        }
        
        // Validate Phone Number
        var phoneRegex = /^[0-9]{3}[ |-]?[0-9]{3}[ |-]?[0-9]{4}$/;
        if (contactForm.sender_phone.value !== "") {
            if (!phoneRegex.test(contactForm.sender_phone.value)) {
                noPhone.style.display = "block";
                contactForm.sender_phone.focus();
                showValidationError();
                return false;
            } else {
                objSenderMsg.sPhoneNum = contactForm.sender_phone.value;
                noPhone.style.display = "none";
            }
        }
        
        // Verify if Location is selected
        if (contactForm.resto_location.value !== "no-resto") {
            objSenderMsg.sLocation = contactForm.resto_location.options[contactForm.resto_location.selectedIndex].text;
        }
        
        // Validate Subject
        if (contactForm.message_subject.value === "") {
            noSubject.style.display = "block";
            contactForm.message_subject.focus();
            showValidationError();
            return false;
        } else {
            objSenderMsg.sSubject = contactForm.message_subject.value;
            noSubject.style.display = "none";
        }
        
        // Validate Message
        if (contactForm.sender_message.value === "") {
            noMessage.style.display = "block";
            contactForm.message_subject.focus();
            showValidationError();
            return false;
        } else {
            objSenderMsg.sMessage = contactForm.sender_message.value;
            noMessage.style.display = "none";
        }
        // --- End of Validation ---
        
        
        // Let user know the message was submitted correctly
        messageSent();
        
        return false; // Prevent the form from submitting
    } // End of function sendContactMessage
    
    // Function to show generic validation error message
    // -------------------------------------------------
    function showValidationError () {
        document.getElementById("validation-error").style.display = "block";
    }
    
    // Function triggered when message was submitted successfully
    // ----------------------------------------------------------
    function messageSent () {
        
        // variables declaration
        var sThankYouMsg = "";
        var successMsg = document.getElementById("submit-success");
        
        // Hide validation error message
        document.getElementById("validation-error").style.display = "none";
        
        // Build thank you message and reset form
        sThankYouMsg = "Thank you " + objSenderMsg.sSenderName + " for your message.<br />We hope to see you again"
        if (objSenderMsg.sLocation === ""){
            sThankYouMsg += "."
        } else {
            sThankYouMsg += " at our " + objSenderMsg.sLocation + " restaurant.";
        }
        successMsg.innerHTML = sThankYouMsg;
        successMsg.style.display = "block";
        contactForm.reset();
        
        // Hide message after some time
        var tMsgTimer = setTimeout(function () {
            successMsg.style.display = "none";
        }, 7000);
        
    }
    
    // Function to display top 10 reviews at a regular interval
    // --------------------------------------------------------
    function rotateReviews () {
        
        var tReviewsTimer = setInterval(function () {
            console.log("Current display: " + currentReview);
            
            document.getElementById("review-text").innerHTML = lstTop10Reviews[currentReview].reviewText;
            document.getElementById("sender-name").innerHTML = lstTop10Reviews[currentReview].sender;

            if (nextReview < lstTop10Reviews.length) {
                currentReview = nextReview;
                nextReview += 1;
            } else {
                currentReview = 0;
                nextReview = 1;
            }
        }, 5000);
        
    }
    
}; // End of function wrapper