document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
        } else {
            themeToggle.textContent = "🌙";
        }
    });
});
