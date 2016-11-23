// Listener for window.onload to wrap all code inside
window.onload = function() {
    
    // Global variables
    var objOrderSummary = {
        imgGiftCardDesign: "",
        iGiftCardAmount: 0,
        rTotalAmount: 0.0,
        sOrderDate: "",
        sRecipientName: "",
        sRecipientEmail: "",
        sPurchaserName: ""
    };
    var elCustomAmount = document.getElementById("gc-amount");
    var elErrMessage = document.getElementById("amount-err");
    var elMainContent = document.getElementById("main-content");
    var elOrderSummary = document.getElementById("order-summary");
    
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    
    // --- Dynamic preview of gift card selected ---
    // ---------------------------------------------
    // Variables declaration
    var elCardPreview = document.getElementById("card-preview");
    var elOrderPrevCard = document.getElementById("choosen-gift-card");
    var lstDesignCards = document.getElementById("gift-cards-selection").children;
    
    // Add click event to each designs for preview
    for (var i = 0; i < lstDesignCards.length; i++) {
        lstDesignCards[i].onclick = previewSelectedCard;
    }
    
    
    // --- Predefined & Custom Amount gift card ---
    // --------------------------------------------
    var lstPredefinedAmts = document.getElementById("predefined-amount").children;
    
    // Add click event to each amount
    for (var i = 0; i < lstPredefinedAmts.length; i++) {
        //console.log(lstPredefinedAmts[i].children[0].innerHTML);
        lstPredefinedAmts[i].onclick = predefinedAmountSelected;
    }
    
    // Handling of input in the amount input field
    elCustomAmount.onchange = updateAmount;
    
    
    // --- Handling Order Submission ---
    // ---------------------------------
    var frmOrderSubmission = document.forms.gift_card_form;
    frmOrderSubmission.onsubmit = processOrder;
    
    
    // Handling edit of order details
    // ------------------------------
    document.getElementById("edit-order").onclick = modifyOrder;
    
    
    // Handling of order cancel
    // ------------------------
    document.getElementById("cancel-order").onclick = cancelOrder;
    
    // Handling of confirm order
    // -------------------------
    document.getElementById("btn_ok").onclick = confirmOrder;
    
    
    // === FUNCTIONS DECLARATION === //
    // ----------------------------- //
    // Function to display selected gift card in preview pannel
    function previewSelectedCard() {
        // Remove class "selected-card" from any gift-card
        for (var i = 0; i < lstDesignCards.length; i++){
            if (lstDesignCards[i].className === "selected-card") {
                lstDesignCards[i].classList.remove("selected-card");
            }
        }
        
        // Add class name to selected gift card
        this.classList.add("selected-card");
        
        // Update preview picture
        elCardPreview.children[0].src = this.children[0].src;
        
        // Update gift card design in the 'Your Order' section as well
        //elOrderPrevCard.children[0].src = this.children[0].src;
    } // end of function previewSelectedCard
    
    // Function to display selected predefined amount in the input textbox
    function predefinedAmountSelected() {
        // Remove class "amount-selected" from anu list item
        removeSelAmtClassName();
        
        // Add class name to selected list item
        this.classList.add("amount-selected");
        
        // Update input textbox
        elCustomAmount.value = this.children[0].innerHTML;
        
        // Hide error message
        elErrMessage.style.display = "none";
        
    } // end of function predefinedAmountSelected
    
    // Function to handle/validate amount input from customer
    function updateAmount() {
        // Capture data input
        var inputAmount = elCustomAmount.value;
        var iAmount;
        
        // Hide error message
        elErrMessage.style.display = "none";
        
        // If empty string entered, empty input textbox
        if (inputAmount.trim() === "") {
            elCustomAmount.value = "";
            removeSelAmtClassName()
        
            // If input is not a number, display error message
        } else if (isNaN(inputAmount) === true) {
            elErrMessage.innerHTML = "Please enter a number only!";
            elErrMessage.style.display = "block";
            elCustomAmount.focus();
            removeSelAmtClassName();
            
            // If a number is entered, then proceed to next steps of validations
        } else {
            // Round to nearest integer value
            iAmount = Math.round(parseFloat(inputAmount));
            elCustomAmount.value = iAmount;
            
            // Check if number is between $10 and $250
            if (iAmount > 9 && iAmount < 251) {
                // Check if entered value is one of the predefined amount
                switch (iAmount) {
                    case 25:
                        removeSelAmtClassName();
                        lstPredefinedAmts[0].classList.add("amount-selected");
                        break;
                        
                    case 50:
                        removeSelAmtClassName();
                        lstPredefinedAmts[1].classList.add("amount-selected");
                        break;
                        
                    case 100:
                        removeSelAmtClassName();
                        lstPredefinedAmts[2].classList.add("amount-selected");
                        break;
                        
                    default:
                        removeSelAmtClassName();
                        
                }
                
            } else {
                // Input value not in range required
                removeSelAmtClassName();
                elErrMessage.innerHTML = "Please enter an amount between $10 and $250 only."
                elErrMessage.style.display = "block";
                elCustomAmount.focus();
            }
        }
        
    } // end of function updateAmount
    
    // Function to remove the class name "amount-selected" on any predefined amount
    function removeSelAmtClassName() {
        // Loop through the list of predefined amount and check
        for (var i = 0; i < lstPredefinedAmts.length; i++) {
            if (lstPredefinedAmts[i].className === "amount-selected") {
                lstPredefinedAmts[i].classList.remove("amount-selected");
            }
        }
        
    } // end of function removeSelAmtClassName

    // Function to handle form submission
    function processOrder() {
        
        // Get field validation indicators
        // -------------------------------
        var no_recipient_name = document.getElementById("no_r_name");
        var no_recipient_email = document.getElementById("no_r_email");
        var no_name = document.getElementById("no_p_name");
        var no_email = document.getElementById("no_p_email");
        var no_add = document.getElementById("no_p_add1");
        var no_city = document.getElementById("no_p_city");
        var no_prov = document.getElementById("n_p_prov");
        var no_pc = document.getElementById("no_p_pc");
        var no_pn = document.getElementById("no_pn");
        
        
        // Validate input fields from the form
        // -----------------------------------
        
        // Check if amount selected
        if (elCustomAmount.value.trim() === "") {
            elErrMessage.innerHTML = "Please enter/select an amount!";
            elErrMessage.style.display = "block";
            elCustomAmount.focus();
            return false;
        }
        
        // Validate Recipient's Name
        if (frmOrderSubmission.r_name.value.trim() === "") {
            no_recipient_name.style.display = "inline";
            frmOrderSubmission.r_name.focus();
            showValidationError();
            return false;
        } else {
            objOrderSummary.sRecipientName = frmOrderSubmission.r_name.value.trim();
            no_recipient_name.style.display = "none";
        }
        
        // Validate Recipient's Email
        if (frmOrderSubmission.r_email.value.trim() === "") {
            no_recipient_email.innerHTML = "Please provide the recipient's email address.";
            no_recipient_email.style.display = "inline";
            frmOrderSubmission.r_email.focus();
            showValidationError();
            return false;
        } else if (!emailRegex.test(frmOrderSubmission.r_email.value.trim())) {
            no_recipient_email.innerHTML = "Please provide a valid email address.";
            no_recipient_email.style.display = "inline";
            frmOrderSubmission.r_email.focus();
            showValidationError();
            return false;
        } else {
            objOrderSummary.sRecipientEmail = frmOrderSubmission.r_email.value.trim();
            no_recipient_email.style.display = "none";
        }
        
        // Validate Purchaser's Name
        if (frmOrderSubmission.p_name.value.trim() === "") {
            no_name.style.display = "inline";
            frmOrderSubmission.p_name.focus();
            showValidationError();
            return false;
        } else {
            objOrderSummary.sPurchaserName = frmOrderSubmission.p_name.value.trim();
            no_name.style.display = "none";
        }
        
        // Validate Purchaser's Email
        if (frmOrderSubmission.p_email.value.trim() === "") {
            no_email.innerHTML = "Please provide your email address.";
            no_email.style.display = "inline";
            frmOrderSubmission.p_email.focus();
            showValidationError();
            return false;
        } else if (!emailRegex.test(frmOrderSubmission.p_email.value.trim())) {
            no_email.innerHTML = "Please provide a valid email address.";
            no_email.style.display = "inline";
            frmOrderSubmission.p_email.focus();
            showValidationError();
            return false;
        } else {
            no_email.style.display = "none";
        }
        
        // Validate Purchaser's Address
        if (frmOrderSubmission.p_add1.value.trim() === "") {
            no_add.style.display = "inline";
            frmOrderSubmission.p_add1.focus();
            showValidationError();
            return false;
        } else {
            no_add.style.display = "none";
        }
        
        // Validate Purchaser's City
        if (frmOrderSubmission.p_city.value.trim() === "") {
            no_city.style.display = "inline";
            frmOrderSubmission.p_city.focus();
            showValidationError();
            return false;
        } else {
            no_city.style.display = "none";
        }
        
        // Validate Purchaser's Province
        if (frmOrderSubmission.p_prov.value === "no_prov") {
            no_prov.style.display = "inline";
            frmOrderSubmission.p_prov.focus();
            showValidationError();
            return false;
        } else {
            no_prov.style.display = "none";
        }
        
        // Validate Postal Code
        var postalCodeRegex = /^[a-z][0-9][a-z](\s|-)?[0-9][a-z][0-9]$/i;
        if (frmOrderSubmission.p_pc.value.trim() === "") {
            no_pc.innerHTML = "Please provide your postal code.";
            no_pc.style.display = "inline";
            frmOrderSubmission.p_pc.focus();
            showValidationError();
            return false;
        } else if (!postalCodeRegex.test(frmOrderSubmission.p_pc.value.trim())) {
            no_pc.innerHTML = "Please provide a valid postal code.";
            no_pc.style.display = "inline";
            frmOrderSubmission.p_pc.focus();
            showValidationError();
            return false;
        } else {
            no_pc.style.display = "none";
        }
        
        // Validate Phone Number
        var phoneRegex = /^[0-9]{3}[ |-]?[0-9]{3}[ |-]?[0-9]{4}$/;
        if (frmOrderSubmission.p_pn.value.trim() === "") {
            no_pn.innerHTML = "Please provide a phone number."
            no_pn.style.display = "inline";
            frmOrderSubmission.p_pn.focus();
            showValidationError();
            return false;
        } else if (!phoneRegex.test(frmOrderSubmission.p_pn.value.trim())) {
            no_pn.innerHTML = "Please provide a valid phone number."
            no_pn.style.display = "inline";
            frmOrderSubmission.p_pn.focus();
            showValidationError();
            return false;
        } else {
            no_pn.style.display = "none";
        }
        
        // Save values in object if submission valid
        objOrderSummary.imgGiftCardDesign = elCardPreview.children[0].src;
        objOrderSummary.iGiftCardAmount = elCustomAmount.value;
        objOrderSummary.rTotalAmount = (elCustomAmount.value * 1.13).toFixed(2);
        objOrderSummary.sOrderDate = new Date().toDateString();
        
        // Show order summary after order submitted
        showCurrentOrder();
        
        return false;   // prevent the form from submitting
    }
    
    // Function to show generic validation error message
    function showValidationError () {
        document.getElementById("validation-error").style.display = "block";
    }
    
    // Function to hide order form and show order summary
    function showCurrentOrder() {
        // Display order details
        elOrderPrevCard.children[0].src = objOrderSummary.imgGiftCardDesign;
        document.getElementById("your-amount").innerHTML = objOrderSummary.iGiftCardAmount;
        document.getElementById("order-date").innerHTML = objOrderSummary.sOrderDate;
        document.getElementById("recipient-name").innerHTML = objOrderSummary.sRecipientName;
        document.getElementById("recipient-email").innerHTML = objOrderSummary.sRecipientEmail;
        document.getElementById("amount-due").innerHTML = objOrderSummary.rTotalAmount;

        // Hide validation error message
        document.getElementById("validation-error").style.display = "none";
                
        // variables declaration
        var sThankYouMsg = "";
        var successMsg = document.getElementById("order-success");
        
        // Build thank you message and reset form
        sThankYouMsg = "Thank you " + objOrderSummary.sPurchaserName + " for your order. Please review your order as follows."
        successMsg.innerHTML = sThankYouMsg;
        
        // Hide order form and show order summary
        elMainContent.classList.add("hidden");
        elOrderSummary.classList.remove("hidden");
    }
    
    // Function to edit order details
    function modifyOrder() {
        // Hide order summary and show form order again
        elOrderSummary.classList.add("hidden");
        elMainContent.classList.remove("hidden");
        document.getElementById('input-amount').scrollIntoView();
    }
    
    // Function to cancel current order
    function cancelOrder() {
        var confirmAction = confirm("Are you sure you want to cancel the current order?");
        if (confirmAction === true) {
            // Hide order summary and show a form after reset
            frmOrderSubmission.reset();
            elOrderSummary.classList.add("hidden");
            elMainContent.classList.remove("hidden");
        }
    }
    
    // Function called when user confirmed order
    function confirmOrder() {
        // Hide order summary and show a form after reset
        window.location.href="gift-card.html";
        elOrderSummary.classList.add("hidden");
        elMainContent.classList.remove("hidden");
    }
    
} // end of onload function








