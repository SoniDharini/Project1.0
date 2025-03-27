async function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    try {
        let response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        let result = await response.json();

        if (response.status === 200) {
            alert("Login Successful!");
            window.location.href = "herosection.html"; 
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
    }
}
