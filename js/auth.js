"use strict";

const apiBaseURL = "https://microbloglite.herokuapp.com";

// You can use this function to get the login data of the logged-in
// user (if any). It returns either an object including the username
// and token, or an empty object if the visitor is not logged in.
function getLoginData() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}

// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn() {
  const loginData = getLoginData();
  return !!loginData.token;
}

// Helper function to handle API errors
function handleAPIError(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

// Function to handle user login
async function login(username, password) {
  try {
    const response = await fetch(apiBaseURL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await handleAPIError(response);
    return data;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
}

// Function to handle user logout
async function logout() {
  try {
    const loginData = getLoginData();
    const response = await fetch(apiBaseURL + "/auth/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    const data = await handleAPIError(response);
    return data;
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw error;
  } finally {
    window.localStorage.removeItem("login-data");
    window.location.assign("../");
  }
}

