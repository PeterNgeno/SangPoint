// Admin Login
document.getElementById("login-btn")?.addEventListener("click", async () => {
  const email = prompt("Enter admin email:");
  const password = prompt("Enter admin password:");

  const response = await fetch("/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    alert("Logged in successfully");
  } else {
    alert("Login failed: " + data.message);
  }
});

// Fetch Questions
document.getElementById("start-quiz-btn")?.addEventListener("click", async () => {
  const section = prompt("Enter section (e.g., A, B):");
  const response = await fetch(`/questions/${section}`);

  if (response.ok) {
    const data = await response.json();
    console.log("Questions:", data.questions);
    alert("Questions loaded. Start answering!");
  } else {
    alert("Failed to load questions.");
  }
});
