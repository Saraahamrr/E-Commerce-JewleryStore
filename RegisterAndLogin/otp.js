let generatedOtp = ''; // Variable to store the generated OTP

// Function to generate a random OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}

// Function to send OTP email
function sendOtp() {
    const email = document.getElementById('email').value; // Get email entered by the user
    
    if (!email) {
        alert("Please enter a valid email!");
        return;
    }

    // Generate OTP
    generatedOtp = generateOtp();
    
    // Send OTP using EmailJS
    const params = {
        email: email,   // Use the email entered by the user
        otp: generatedOtp // Use the generated OTP
    };

    // Send email using the EmailJS service
    emailjs.send("service_ln4x6ao", "template_5wuukud", params)
        .then(function(response) {
            alert("OTP sent to your email!");
           
            document.querySelector('.otpverify').style.display = 'flex';
        }, function(error) {
            console.error("Error sending OTP: ", error);
            alert("Failed to send OTP. Please try again.");
        });
}


function verifyOtp() {
    const enteredOtp = document.getElementById('otp-inp').value;

    if (enteredOtp === '') {
        alert("Please enter the OTP!");
        return;
    }

    
    if (enteredOtp == generatedOtp) {
        alert("OTP verified successfully!");
    } else {
        alert("Invalid OTP! Please try again.");
    }
}
