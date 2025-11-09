document.addEventListener("DOMContentLoaded", () => {
  const perfilIcon = document.getElementById("perfil-icon");
  const dropdown = document.getElementById("perfil-dropdown");
  const logoutBtn = document.getElementById("logout-btn");
  const usuarioNome = document.getElementById("usuario-nome");

  // 🔹 Exibe nome do usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuarioLogado) {
    usuarioNome.textContent = usuarioLogado.nome || "Usuário";
  }

  // 🔹 Toggle dropdown perfil
  perfilIcon.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // 🔹 Encerrar sessão
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.setItem("sessaoEncerrada", "true");
    window.location.href = "login.html";
  });

  // 🔹 Fecha dropdown ao clicar fora
  document.addEventListener("click", (event) => {
    if (!perfilIcon.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });

  // 🔹 Links do menu
  document.getElementById("inicio-link").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 🔹 Cardápio e Eventos — agora sem rolar
  document.getElementById("cardapio-link").addEventListener("click", (e) => {
    e.preventDefault();
    // futuramente levará ao Cardapio.html
  });

  document.getElementById("eventos-link").addEventListener("click", (e) => {
    e.preventDefault();
    // futuramente levará ao Eventos.html
  });
});
