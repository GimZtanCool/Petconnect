document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value.trim();
  const password = document.querySelector('input[type="password"]').value;

  if (!email || !password) {
    document.getElementById("errorMsg").textContent = "Todos los campos son obligatorios.";
    return;
  }

  try {
    const res = await fetch("http://20.49.48.222:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();

    if (res.ok) {
      alert("🎉 Inicio de sesión exitoso");
      window.location.href = "feed.html"; // o dashboard.html
    } else {
      document.getElementById("errorMsg").textContent = result.error || "Credenciales inválidas.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("errorMsg").textContent = "Error de red o del servidor.";
  }
});
