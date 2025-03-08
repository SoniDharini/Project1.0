document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");
    const registerBtn = document.querySelector(".register-btn");
    const loginBtn = document.querySelector(".login-btn");

    registerBtn.addEventListener('click', () => { 
        container.classList.add('active'); 
    });

    loginBtn.addEventListener('click', () => { 
        container.classList.remove('active'); 
    });

    document.querySelector(".register form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const cpassword = document.getElementById("confirmpassword").value.trim();

        console.log("Password:", password, "Confirm Password:", cpassword); // Debugging

        if (password !== cpassword) {
            alert("Passwords do not match!");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, cpassword })
        });

        const data = await response.json();
        alert(data.message);
    });
});
