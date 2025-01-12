// document.addEventListener("DOMContentLoaded", () => {
//     const userMenu = document.getElementById("userMenu");
//     const userName = document.getElementById("userName");
//     const userEmail = document.getElementById("userEmail");
//     const logoutBtn = document.getElementById("logoutBtn");

    
//     const username = "actual_username";


//     fetch(`/user-info?username=${username}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 userName.textContent = `Name: ${data.user.username}`;
//                 userEmail.textContent = `Email: ${data.user.email}`;
//             } else {
//                 console.error("Error fetching user data:", data.message);
//             }
//         })
//         .catch(error => console.error("Error:", error));

    
//     logoutBtn.addEventListener("click", () => {
//         alert("Logged out successfully!");
//         window.location.href = "/login.html";
//     });
// });
