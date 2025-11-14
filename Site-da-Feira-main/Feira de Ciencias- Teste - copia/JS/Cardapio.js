// Cardapio.js (corrigido)
document.addEventListener("DOMContentLoaded", () => {
  initObserver();
  verificarSessao();
  initPerfilDropdown();
  bloqueioRolagemHorizontal();
  ajusteMenuPorTamanho();
  configurarLinks();

  const botaoAbrirPopup = document.getElementById("abrirPopup");
  const popup = document.getElementById("popup");
  const botaoFecharPopup = document.getElementById("fecharPopup");

  // Modal elements (obtidos aqui para garantir que o DOM já estava carregado)
  // 'modal' no HTML tem id="modal" e classe .modal-overlay
  window.modalOverlay = document.getElementById("modal"); // uso window. para debugar se necessário
  window.modalContent = window.modalOverlay ? window.modalOverlay.querySelector(".modal-content") : null;
  const fecharModalBtn = document.getElementById("fecharModal"); // id do botão X
  const imagemModal = document.getElementById("imagemModal");
  const tituloModal = document.getElementById("tituloModal");
  const descricaoModal = document.getElementById("descricaoModal");

  // Apenas coluna 1 permanece
  const coluna1Modal = document.getElementById("coluna1Modal");

  const cardapios = {
    1: {
      titulo: "Segunda-feira",
      descricao: "Macarrão à bolonhesa, arroz branco, feijão preto, salada verde e suco de laranja natural.",
      imagem: "../IMAGENS/Imagem 2.jpeg",
      coluna1: "Proteínas: 22g<br>Carboidratos: 65g<br>Gorduras: 10g<br>Fibras: 4g"
    },
    2: {
      titulo: "Terça-feira",
      descricao: "Frango assado, arroz integral, feijão carioca, legumes cozidos e suco de uva.",
      imagem: "../IMAGENS/imagem 3.jpg",
      coluna1: "Proteínas: 25g<br>Carboidratos: 58g<br>Gorduras: 8g<br>Fibras: 5g"
    },
    3: {
      titulo: "Quarta-feira",
      descricao: "Carne moída, arroz branco, feijão preto, purê de batata e refresco de maracujá.",
      imagem: "../IMAGENS/imagem 4.jpeg",
      coluna1: "Proteínas: 28g<br>Carboidratos: 60g<br>Gorduras: 12g<br>Fibras: 3g"
    },
    4: {
      titulo: "Quinta-feira",
      descricao: "Peixe grelhado, arroz com legumes, feijão carioca, salada de tomate e suco de limão.",
      imagem: "../IMAGENS/imagem 3.jpg",
      coluna1: "Proteínas: 24g<br>Carboidratos: 55g<br>Gorduras: 9g<br>Fibras: 5g"
    },
    5: {
      titulo: "Sexta-feira",
      descricao: "Estrogonofe de carne, arroz branco, batata palha, feijão e suco de abacaxi.",
      imagem: "../IMAGENS/Imagem 2.jpeg",
      coluna1: "Proteínas: 26g<br>Carboidratos: 70g<br>Gorduras: 15g<br>Fibras: 4g"
    },
  };

  // ---------- POPUP DE SELEÇÃO ----------
  if (botaoAbrirPopup && popup) {
    botaoAbrirPopup.addEventListener("click", () => {
      popup.style.display = "flex";
    });
  }

  if (botaoFecharPopup && popup) {
    botaoFecharPopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // dias do calendário (abre modal)
  document.querySelectorAll(".dias-calendario button").forEach((botao) => {
    botao.addEventListener("click", () => {
      const dia = parseInt(botao.dataset.dia);
      if (!isNaN(dia) && cardapios[dia]) {
        abrirModalComCardapio(cardapios[dia]);
      }
      if (popup) popup.style.display = "none";
    });
  });

  // ---------- FUNÇÕES DO MODAL (abertura/fechamento) ----------
  function abrirModalComCardapio(card) {
    if (!card) return;
    if (tituloModal) tituloModal.textContent = card.titulo;
    if (descricaoModal) descricaoModal.textContent = card.descricao;
    if (imagemModal) {
      imagemModal.src = card.imagem;
      imagemModal.alt = card.titulo || "Imagem do prato";
    }
    if (coluna1Modal) coluna1Modal.innerHTML = card.coluna1 || "";

    openModal();
  }

  // openModal / closeModal com animação (usa classes .closing definidas no CSS)
  function openModal() {
    if (!window.modalOverlay || !window.modalContent) return;

    // garante que visível
    window.modalOverlay.style.display = "flex";

    // remove classe de fechamento caso exista
    window.modalOverlay.classList.remove("closing");
    window.modalContent.classList.remove("closing");

    // remove aria-hidden se houver
    window.modalOverlay.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!window.modalOverlay || !window.modalContent) {
      // apenas esconder se não existir animação
      if (window.modalOverlay) window.modalOverlay.style.display = "none";
      return;
    }

    // adiciona animação de fechamento
    window.modalOverlay.classList.add("closing");
    window.modalContent.classList.add("closing");
    window.modalOverlay.setAttribute("aria-hidden", "true");

    // ao terminar a animação, realmente esconde o overlay
    const handler = function (e) {
      // garantir que foi a animação da overlay que terminou (ou sempre remover)
      window.modalOverlay.style.display = "none";
      window.modalOverlay.removeEventListener("animationend", handler);
    };

    // se não houver suporte a animationend por algum motivo, cai em timeout seguro
    window.modalOverlay.addEventListener("animationend", handler);
    // fallback: remove após 450ms (um pouco maior que 350ms definido no CSS)
    setTimeout(() => {
      if (window.modalOverlay && window.getComputedStyle(window.modalOverlay).display !== "none") {
        window.modalOverlay.style.display = "none";
      }
    }, 500);
  }

  // fechar ao clicar no botão X
  if (fecharModalBtn) {
    fecharModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // fechar clicando fora (clicar no overlay)
  if (window.modalOverlay) {
    window.modalOverlay.addEventListener("click", (e) => {
      // se o clique foi diretamente no overlay (fora do conteúdo), fecha
      if (e.target === window.modalOverlay) {
        closeModal();
      }
    });
  }

  // fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // fecha tanto o dropdown quanto o modal
      const dropdown = document.getElementById("perfil-dropdown");
      const perfilIcon = document.getElementById("perfilIcon");
      if (dropdown && dropdown.classList.contains("ativo")) {
        dropdown.classList.remove("ativo");
        if (perfilIcon) perfilIcon.setAttribute("aria-expanded", "false");
        dropdown.setAttribute("aria-hidden", "true");
      }

      // fechar modal se estiver aberto
      if (window.modalOverlay && window.getComputedStyle(window.modalOverlay).display !== "none") {
        closeModal();
      }
    }
  });

  // abrir modal ao clicar nos cards fixos
  const cardsFixos = document.querySelectorAll(".cards-container .card");
  cardsFixos.forEach((card, index) => {
    card.addEventListener("click", () => {
      const dia = index + 1;
      if (cardapios[dia]) abrirModalComCardapio(cardapios[dia]);
    });
  });
}); // fim DOMContentLoaded


// ---------- FUNÇÕES GERAIS (mantive sua estrutura original) ----------
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (linkEventos) {
    linkEventos.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "eventos.html";
    });
  }
}

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

function verificarSessao() {
  try {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const nomeUsuarioElemento = document.getElementById("nomeUsuario");

    if (!usuarioLogado) {
      if (nomeUsuarioElemento) nomeUsuarioElemento.textContent = "Visitante";
      return;
    }

    if (nomeUsuarioElemento) nomeUsuarioElemento.textContent = usuarioLogado.nome || "Usuário";
  } catch (err) {
    console.warn("Erro ao verificar sessão:", err);
    localStorage.removeItem("usuarioLogado");
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
