let token = ""

function login() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      token = data.token
      alert("Login exitoso")
    })
    .catch(() => alert("Error al iniciar sesión"))
}

function getServices() {
  fetch("http://localhost:3000/api/services", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById("services")
      ul.innerHTML = ""
      data.forEach(s => {
        const li = document.createElement("li")
        li.textContent = `${s.title} - ${s.type}`
        ul.appendChild(li)
      })
    })
    .catch(() => alert("Acceso denegado"))
}
