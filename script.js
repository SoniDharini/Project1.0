function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function(){
        document.getElementById('profile-image').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    alert("Login Successful!");
    return true;
}



   