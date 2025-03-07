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

        const username = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        alert(data.message);
    });
});
