const form = document.getElementById("registrationForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    clearErrors();

    // Name validation
    if (name.value.trim() === "") {
        showError(name, "Full name is required");
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.value.trim() === "") {
        showError(email, "Email is required");
        isValid = false;
    } else if (!email.value.match(emailPattern)) {
        showError(email, "Enter a valid email");
        isValid = false;
    }

    // Password validation
    if (password.value.trim() === "") {
        showError(password, "Password is required");
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        isValid = false;
    }

    // Confirm password validation
    if (confirmPassword.value.trim() === "") {
        showError(confirmPassword, "Please confirm your password");
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        form.reset();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error");

    input.classList.add("error-border");
    error.textContent = message;
}

function clearErrors() {
    const inputs = document.querySelectorAll("input");
    const errors = document.querySelectorAll(".error");

    inputs.forEach(input => input.classList.remove("error-border"));
    errors.forEach(error => error.textContent = "");
}
