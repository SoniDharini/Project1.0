async function sendResetLink(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    try {
        let response = await fetch("http://localhost:5000/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        let result = await response.json();

        if (response.status === 200) {
            alert("Password has been sent to your email.");
        } else {
            alert(result.message); // Show error if email not found
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
    }
}
