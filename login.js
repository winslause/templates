"use strict";
// login.ts
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh on form submission
        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();
        // Define valid credentials
        const credentials = {
            admin: "admin",
            driver: "driver",
            parent: "parent",
        };
        // Check if the credentials are valid
        if (credentials[usernameInput] === passwordInput) {
            // Store the username in local storage
            localStorage.setItem("username", usernameInput);
            // Redirect based on the username
            if (usernameInput === "admin") {
                window.location.href = "index1.html";
            }
            else if (usernameInput === "driver") {
                window.location.href = "driver.html";
            }
            else if (usernameInput === "parent") {
                window.location.href = "parent.html";
            }
        }
        else {
            // Display error message for wrong credentials
            errorMessage.textContent = "Wrong details. Please try again.";
            errorMessage.style.display = "block";
        }
    });
});
