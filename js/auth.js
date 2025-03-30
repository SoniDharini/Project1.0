function saveUserData(token, username) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
}

function getUsername() {
    return localStorage.getItem('username');
    
}

function displayUserAvatar() {
    const username = getUsername();
    if (username) {
        const avatar = document.getElementById('profile-circle');
        avatar.textContent = username.charAt(0).toUpperCase();
    }
}

function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = "login.html"; // Redirect to login page
}

// Ensure avatar is displayed on page load
window.onload = displayUserAvatar;
