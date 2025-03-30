document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let dob = document.getElementById("dob").value;
    let address = document.getElementById("address").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();

    // Get selected gender
    let gender = document.getElementsByName("gender");
    let gen = "";
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            gen = gender[i].value;
            break;
        }
    }
    if (!gen) {
        alert("Please select a gender.");
        return;
    }

    // Password validation: At least 6 characters, one uppercase, one lowercase, one special character
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long, include uppercase, lowercase, and a special character.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        let response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, dob, gen, address, password }),
        });

        let result = await response.json();
        if (response.status === 201) {
            alert("Registration successful!");
            window.location.href = "login.html";
        } else {
            alert(result.message); // Show the error message for duplicate username/email
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
    }
});

// Preview Image Function
function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        document.getElementById('profile-image').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
