document.addEventListener("DOMContentLoaded", () => {
  initObserver();
  verificarSessao();
  initPerfilDropdown();
  bloqueioRolagemHorizontal();
  ajusteMenuPorTamanho();
  configurarLinks();
});

function configurarLinks() {
  const linkInicio = document.querySelector('a[href="#inicio"]');
  const linkCardapio = document.querySelector('a[href="#cardapio"]');
  const linkEventos = document.querySelector('a[href="#eventos"]');

  if (linkInicio) {
    linkInicio.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "SiteHome.html";
    });
  }

  if (linkCardapio) {
    linkCardapio.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Cardapio.html";
    });
  }

  if (linkEventos) {
    linkEventos.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Pagina em desensolvimento");
    });
  }
}

// Mantido igual
function initObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Mantido igual
function verificarSessao() {
  try {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const nomeUsuarioElemento = document.getElementById("nomeUsuario");

    if (!usuarioLogado) {
      window.location.href = "login.html";
      return;
    }

    if (nomeUsuarioElemento) nomeUsuarioElemento.textContent = usuarioLogado.nome || "Usuário";
  } catch (err) {
    console.warn("Erro ao verificar sessão:", err);
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
  }
}

function initPerfilDropdown() {
  const perfilIcon = document.getElementById("perfilIcon");
  const dropdown = document.getElementById("perfil-dropdown");
  const encerrarSessao = document.getElementById("encerrarSessao");

  if (!perfilIcon || !dropdown) return;

  perfilIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    const ativo = dropdown.classList.toggle("ativo");
    perfilIcon.setAttribute("aria-expanded", ativo ? "true" : "false");
    dropdown.setAttribute("aria-hidden", ativo ? "false" : "true");
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target) && !perfilIcon.contains(event.target)) {
      dropdown.classList.remove("ativo");
      perfilIcon.setAttribute("aria-expanded", "false");
      dropdown.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdown.classList.remove("ativo");
      perfilIcon.setAttribute("aria-expanded", "false");
      dropdown.setAttribute("aria-hidden", "true");
    }
  });

  if (encerrarSessao) {
    encerrarSessao.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("sessaoEncerrada", "true");
      localStorage.removeItem("usuarioLogado");
      window.location.href = "login.html";
    });

    encerrarSessao.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        encerrarSessao.click();
      }
    });
  }
}

function bloqueioRolagemHorizontal() {
  document.body.style.overflowX = "hidden";
  document.documentElement.style.overflowX = "hidden";
}

function ajusteMenuPorTamanho() {
  const nav = document.querySelector(".header-content");
  if (!nav) return;

  const ajustar = () => {
    if (window.innerWidth < 360) {
      nav.style.height = "52px";
    } else if (window.innerWidth < 480) {
      nav.style.height = "56px";
    } else {
      nav.style.height = "";
    }
  };

  ajustar();
  window.addEventListener("resize", ajustar);
}
