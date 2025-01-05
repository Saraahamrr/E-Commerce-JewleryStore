function loginUser(event) {
    event.preventDefault(); // Prevent form submission and page refresh

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation to ensure both fields are filled
    if (!username || !password) {
        alert("Both username and password are required.");
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
