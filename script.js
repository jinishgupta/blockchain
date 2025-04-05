function flipCard() {
  const card = document.getElementById("flipCard");
  const bg = document.getElementById("bg");

  card.classList.toggle("flipped");

  // Move the background to simulate motion
  if (card.classList.contains("flipped")) {
    bg.style.backgroundPosition = "right";
  } else {
    bg.style.backgroundPosition = "left";
  }
}

function showMessage(id, text, color = "red") {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = `mt-4 text-center text-sm font-medium text-${color}-600`;
}

function signUp(e) {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  if (username.length < 3 || password.length < 4) {
    showMessage("signup-message", "Username or password is too short");
    return;
  }
  localStorage.setItem("user", JSON.stringify({ username, password }));
  showMessage("signup-message", "Sign up successful! You can now sign in.", "green");
  setTimeout(() => {
    flipCard();
    document.getElementById("signup-message").textContent = "";
  }, 1000);
}

function signIn(e) {
  e.preventDefault();
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.username === username && user.password === password) {
    window.location.href = "index.html";
  } else {
    showMessage("signin-message", "Invalid username or password");
  }
}
