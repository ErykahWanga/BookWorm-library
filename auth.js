document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    // Sign Up
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(user => user.email === email)) {
                alert("Email already registered! Try logging in.");
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Sign-up successful! You can now log in.");
            window.location.href = "login.html";
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.email === email && user.password === password);

            if (!user) {
                alert("Invalid email or password!");
                return;
            }

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            alert("Login successful!");
            window.location.href = "index.html";
        });
    }
});
