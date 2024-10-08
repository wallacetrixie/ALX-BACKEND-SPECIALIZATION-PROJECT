function showSignUpForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogInForm() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function checkPasswordStrength() {
  var newPassword = document.getElementById("newPassword").value;
  var passwordStrengthMessage = document.getElementById(
    "passwordStrengthMessage"
  );
  var submitButton = document.getElementById("signupButton");

  if (
    newPassword.length >= 8 &&
    /[A-Z]/.test(newPassword) &&
    /[a-z]/.test(newPassword) &&
    /\d/.test(newPassword)
  ) {
    passwordStrengthMessage.textContent = "Password strength: Strong";
    passwordStrengthMessage.style.color = "green";
    passwordStrengthMessage.style.display = "block";
    submitButton.disabled = false; // Enable the submit button
  } else {
    passwordStrengthMessage.textContent =
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
    passwordStrengthMessage.style.color = "red";
    passwordStrengthMessage.style.display = "block";
    submitButton.disabled = true; // Disable the submit button
  }
}
function registerUser() {
  var newUsername = document.getElementById("newUsername").value;
  var newPassword = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var registrationType = document.querySelector(
    'input[name="registrationType"]:checked'
  ).value;

  // Validating username
  if (!/^[A-Za-z]+$/.test(newUsername)) {
    alert("Username must contain only letters");
    return;
  }
  if (newUsername.length < 4) {
    alert("Username must be at least 4 characters long");
    return;
  }

  // Validating password
  if (newPassword.length < 8) {
    alert("Password must be at least 8 characters long");
    return;
  }
  if (
    !/[A-Z]/.test(newPassword) ||
    !/[a-z]/.test(newPassword) ||
    !/\d/.test(newPassword)
  ) {
    alert(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    );
    return;
  }

  if (newPassword === confirmPassword) {
    alert("Account created successfully");
    // Store the selected registration type in localStorage
    localStorage.setItem("registrationType", registrationType);
    // Redirect based on registration type
    if (registrationType === "client") {
      window.location.href = "client.html";
    } else if (registrationType === "freelancer") {
      window.location.href = "freelancer.html";
    }
  } else {
    alert("Passwords do not match, try again");
  }
}

