function loginUser(event) {
    event.preventDefault(); // Prevent form submission and page refresh

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Define validation flag
    let isValid = true;

    // Clear previous error styling and messages
    document.getElementById("username").style.border = "";
    document.getElementById("password").style.border = "";
    document.getElementById("username-error").textContent = "";
    document.getElementById("password-error").textContent = "";

    // Basic validation to ensure both fields are filled
    if (!username) {
        document.getElementById("username").style.border = "2px solid red";
        document.getElementById("username-error").textContent = "Username is required.";
        isValid = false;
    }

    if (!password) {
        document.getElementById("password").style.border = "2px solid red";
        document.getElementById("password-error").textContent = "Password is required.";
        isValid = false;
    }

    // If the fields are invalid, stop further execution
    if (!isValid) {
        return;
    }

    // Send login credentials to the server via a POST request
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/home.html'; // Redirect to the home page
        } else {
            alert('Invalid login credentials!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}
