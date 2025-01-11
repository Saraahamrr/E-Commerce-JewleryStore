document.getElementById("proceed").addEventListener("click", function () {
    // Get form data
    const name = document.getElementById("billing-name").value;
    const email = document.getElementById("billing-email-address").value;
    const phone = document.getElementById("billing-phone").value;
    const zipCode = document.getElementById("zip-code").value;


    // Define regex patterns
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9._ -]{2,15}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(?:\+20|0020|0)?(10|11|12|15)\d{8}$/;
    const zipCodeRegex = /^[0-9]{5}(-[0-9]{4})?$/;;



    // Validate input and apply red border if invalid
    let isValid = true;

    // Clear previous error styling
    document.getElementById("billing-name").style.border = "";
    document.getElementById("billing-name-error").textContent = "";
    document.getElementById("billing-email-address").style.border = "";
    document.getElementById("billing-email-address-error").textContent = "";
    document.getElementById("billing-phone").style.border = "";
    document.getElementById("billing-phone-error").textContent = "";
    document.getElementById("zip-code").style.border = "";
    document.getElementById("zip-code-error").textContent = "";

    document.querySelectorAll(".error").forEach(function (error) {
        error.style.color = "red";
    });

    // userName validation
    if (name.length === 0) {
        document.getElementById("billing-name").style.border = "2px solid red";
        document.getElementById("billing-name-error").textContent = "Name is required.Please enter a valid name.";
        isValid = false;
    }
    else if (!name.match(nameRegex)) {
        document.getElementById("billing-name").style.border = "2px solid red";
        document.getElementById("billing-name-error").textContent = "Name is invalid.Please enter a valid name.";
    }


    // Email validation
    if (email.length === 0) {
        document.getElementById("billing-email-address").style.border = "2px solid red";
        document.getElementById("billing-email-address-error").textContent = "Email address is required.Please enter a valid email address.";
        isValid = false;
    }
    else if (!email.match(emailRegex)) {
        document.getElementById("billing-email-address").style.border = "2px solid red";
        document.getElementById("billing-email-address-error").textContent = "Email address is invalid.Please enter a valid email address.";
        isValid = false;
    }

    // Phone validation
    if (phone.length === 0) {
        document.getElementById("billing-phone").style.border = "2px solid red";
        document.getElementById("billing-phone-error").textContent = "Phone number is required.Please enter a valid Egyptian phone number.";
        isValid = false;
    }

    else if (!phone.match(phoneRegex)) {
        document.getElementById("billing-phone").style.border = "2px solid red";
        document.getElementById("billing-phone-error").textContent = "Phone Number is invalid.Please enter a valid Egyptian phone number.";
        isValid = false;
    }

    // zipCode validation
    if (zipCode.length === 0) {
    isValid = true;
    }
    else if (!zipCode.match(zipCodeRegex)) {
        document.getElementById("zip-code").style.border = "2px solid red";
        document.getElementById("zip-code-error").textContent = ""
        isValid = false;
    }



    // If any field is invalid, stop the registration
    if (!isValid) {
        return;
    }
}); 

// Random order number
function orderRandomNumber() {
    const orderNumber = document.getElementById("order-number");
    orderNumber.textContent = ""
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = Array.from({ length: 2 }, () => letters[Math.floor(Math.random() * letters.length)]);
    const randomNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    orderNumber.textContent = "#" + randomLetters.join("") + randomNumbers.join("");


    return orderNumber.textContent;

};
console.log(orderRandomNumber());