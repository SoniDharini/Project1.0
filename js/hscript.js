document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const welcomeMessage = document.querySelector(".container h1");
    const usernameDisplay = document.getElementById("username-display"); 
    const profileCircle = document.getElementById("profile-circle");
    const toggleBox = document.getElementById("toggle-box");

    // Load theme from localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.checked = true;
    }

    // Theme switch event
    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // Load username from localStorage or set default
    const username = localStorage.getItem("username") || "User"; 
    welcomeMessage.textContent = `Welcome, ${username}!`; 
    usernameDisplay.textContent = username; 

    // Profile dropdown toggle
    profileCircle.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent immediate closing

        // Toggle display of toggle box
        toggleBox.style.display = (toggleBox.style.display === "block") ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (!toggleBox.contains(e.target) && e.target !== profileCircle) {
            toggleBox.style.display = "none";
        }
    });

    // Close dropdown when clicking the close button
    function closeToggle() {
        toggleBox.style.display = "none";
    }

    // Navigate to settings
    function goToSettings() {
        window.location.href = "/settings";
    }

    // Navigate to profile
    function goToProfile() {
        window.location.href = "/profile";
    }

    // Expose functions globally
    window.closeToggle = closeToggle;
    window.goToSettings = goToSettings;
    window.goToProfile = goToProfile;
});
