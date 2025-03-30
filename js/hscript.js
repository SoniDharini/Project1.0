document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const welcomeMessage = document.querySelector(".container h1");
    const usernameDisplay = document.getElementById("username-display"); 

    // Load theme from localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });
    const username = localStorage.getItem("username") || "User"; // Default to "User" if not set
    welcomeMessage.textContent = `Welcome, ${username}!`; 
    usernameDisplay.textContent = username; // Display username in UI
});
document.getElementById("profile-circle").addEventListener("click", function(event) {
    let toggleBox = document.getElementById("toggle-box");
    toggleBox.style.display = (toggleBox.style.display === "block") ? "none" : "block";

    // Close when clicking outside
    document.addEventListener("click", function closeDropdown(e) {
        if (!toggleBox.contains(e.target) && !event.target.contains(e.target)) {
            toggleBox.style.display = "none";
            document.removeEventListener("click", closeDropdown);
        }
    });
});

function closeToggle() {
    document.getElementById("toggle-box").style.display = "none";
}

function goToSettings() {
    window.location.href = "/settings";
}

function goToProfile() {
    window.location.href = "/profile";
}

document.addEventListener("DOMContentLoaded", () => {
    displayUserAvatar();
    welcomeMessage.textContent = `Welcome, ${username}!`; // Show the first character of the username in the navbar
});
