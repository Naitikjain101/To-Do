// ===================================================
// login.js  –  handles Log in and Sign up
// NOTE: this is a DEMO. Users are stored in the browser (localStorage).
// A real app would check passwords on a server.
// ===================================================

// If you are already logged in, skip straight to the to-do app
if (localStorage.getItem("nocturne_session")) {
  window.location.href = "index.html";
}

let mode = "login";                       // "login" or "signup"

const form     = document.getElementById("authForm");
const errorBox = document.getElementById("error");
const submit   = document.getElementById("submitBtn");
const subtitle = document.getElementById("subtitle");

// 1. Get all saved users  { username: password }
function getUsers() {
  return JSON.parse(localStorage.getItem("nocturne_users")) || {};
}

// 2. Switch between the Log in and Sign up tabs
document.querySelectorAll(".filters button").forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");
    mode = btn.dataset.mode;
    submit.textContent = mode === "login" ? "Log in" : "Create account";
    subtitle.textContent = mode === "login"
      ? "Log in to see your tasks"
      : "Create an account in seconds";
    errorBox.textContent = "";
  };
});

// 3. When the form is sent
form.addEventListener("submit", e => {
  e.preventDefault();                     // stop the page from reloading

  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const users = getUsers();

  if (username.length < 3) return showError("Username must be at least 3 characters.");
  if (password.length < 4) return showError("Password must be at least 4 characters.");

  if (mode === "signup") {
    if (users[username]) return showError("That username is already taken.");
    users[username] = password;
    localStorage.setItem("nocturne_users", JSON.stringify(users));
  } else {
    if (users[username] !== password) return showError("Wrong username or password.");
  }

  // Success: remember who is logged in, then open the app
  localStorage.setItem("nocturne_session", username);
  window.location.href = "index.html";
});

function showError(message) {
  errorBox.textContent = message;
}
