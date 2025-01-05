document.getElementById("register-btn").addEventListener("click", function () {
    // Get form data
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Define regex patterns
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate input and apply red border if invalid
    let isValid = true;

    // Clear previous error styling
    document.getElementById("email").style.border = "";
    document.getElementById("password").style.border = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";

    // Email validation
    if (!email.match(emailRegex)) {
        document.getElementById("email").style.border = "2px solid red";
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Password validation
    if (!password.match(passwordRegex)) {
        document.getElementById("password").style.border = "2px solid red";
        document.getElementById("password-error").textContent = "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.";
        isValid = false;
    }

    // If any field is invalid, stop the registration
    if (!isValid) {
        return;
    }

    // Prepare data object
    const userData = {
        username: username,
        password: password,
        email: email,
        phone: phone,
    };

    // Send data to backend
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                // If user already exists, show an alert and stop further actions
                if (data.message === "User already enrolled!") {
                    alert("User already enrolled! Please use a different email.");
                    return; // Don't navigate to OTP page
                }
                
                alert(data.message);
                // Redirect to OTP verification page
                localStorage.setItem("email", email); // Save email for OTP verification
                window.location.href = "otp.html";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to register user. Please try again.");
        });
});
