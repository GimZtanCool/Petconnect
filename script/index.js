document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.querySelector('input[placeholder="Nombre completo"]').value.trim();
  const email = document.querySelector('input[placeholder="Correo electrónico"]').value.trim();
  const password = document.querySelector('input[placeholder="Contraseña"]').value;

  if (!fullName || !email || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const [firstName, ...lastNameParts] = fullName.split(" ");
  const lastName = lastNameParts.join(" ") || "";

  const data = {
    username: email.split("@")[0],
    email,
    passwordHash: password,
    profile: {
      firstName,
      lastName,
      location: {
        city: "Lima",
        country: "Perú"
      },
      bio: "",
      avatarUrl: ""
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  try {
    const res = await fetch("http://20.49.48.222:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Usuario registrado con éxito");
      document.getElementById("registerForm").reset();
    } else {
      alert("❌ Error al registrar: " + result.error);
    }
  } catch (error) {
    console.error("Error al conectar:", error);
    alert("Error de red o del servidor.");
  }
});
