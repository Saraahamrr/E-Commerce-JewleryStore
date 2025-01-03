document.getElementById("register-btn").addEventListener("click", function () {
    // Get form data
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Validate input
    if (!username || !password || !email || !phone) {
        alert("Please fill in all fields!");
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
