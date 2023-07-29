"use strict";


// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
async function handleLoginForm(event) {
    console.log("SOMONE HIT THE LOGIN BUTTON")
    event.preventDefault();
  
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
  
    if (username === "" || password === "") {
      alert("Please enter your username and password.");
      return;
    }
  
    const loginButton = document.querySelector("#login button");
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";
  
    try {
      const response = await fetch(`${apiBaseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
  
      const { token } = await response.json();
      console.log("LOGIN FORM SUBMITTED")
      const loginData = { username, token };
      window.localStorage.setItem("login-data", JSON.stringify(loginData));
      window.location.assign("../html/profile.html");
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      loginButton.disabled = false;
      loginButton.textContent = "Login";
    }
  }
  
  // Add event listener to the login form
  const loginForm = document.getElementById("login");
  loginForm?.addEventListener("submit", handleLoginForm);