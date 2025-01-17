"use strict";

// Function to handle user registration
async function register(username, fullName, password) {
  const loginData = getLoginData()
  try {
    const response = await fetch(`${apiBaseURL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, fullName, password }),
    });
    const data = await handleAPIError(response);
    return data;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
}

// This function is called when the user submits the registration form.
async function handleRegistrationForm(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const fullnameInput = document.getElementById("fullname")
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const username = usernameInput.value.trim();
  const fullName = fullnameInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (username === "" || password === "" || confirmPassword === "") {
    alert("Please fill in all the fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const registerButton = document.querySelector("#registration button");
  registerButton.disabled = true;
  registerButton.textContent = "Registering...";

  try {
    await register(username, fullName, password);
    alert("Registration successful! You can now log in.");
    window.location.href = "../html/login.html";
  } catch (error) {
    console.log(error);
    alert(error.message);
  } finally {
    registerButton.disabled = false;
    registerButton.textContent = "Register";
  }
}

// Add event listener to the registration form
const registrationForm = document.getElementById("registration");
registrationForm.addEventListener("submit", handleRegistrationForm);
