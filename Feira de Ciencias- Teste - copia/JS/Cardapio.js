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
  const modal = document.getElementById("modal");
  const fecharModal = document.getElementById("fecharModal");
  const imagemModal = document.getElementById("imagemModal");
  const tituloModal = document.getElementById("tituloModal");
  const descricaoModal = document.getElementById("descricaoModal");

  // 🟢 NOVO: Subtítulo e colunas no modal
  const subtituloModal = document.getElementById("subtituloModal");
  const coluna1Modal = document.getElementById("coluna1Modal");
  const coluna2Modal = document.getElementById("coluna2Modal");

  // 🟢 Agora cada card tem título, descrição, imagem e informações nutricionais personalizadas
  const cardapios = {
    1: {
      titulo: "Segunda-feira",
      descricao: "Macarrão à bolonhesa, arroz branco, feijão preto, salada verde e suco de laranja natural.",
      imagem: "../IMAGENS/Imagem 2.jpeg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 22g<br>Carboidratos: 65g<br>Gorduras: 10g<br>Fibras: 4g",
      coluna2: "Calorias: 520 kcal<br>Fonte de ferro e vitaminas do complexo B.<br>Ideal para recuperação muscular.",
    },
    2: {
      titulo: "Terça-feira",
      descricao: "Frango assado, arroz integral, feijão carioca, legumes cozidos e suco de uva.",
      imagem: "../IMAGENS/imagem 3.jpg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 25g<br>Carboidratos: 58g<br>Gorduras: 8g<br>Fibras: 5g",
      coluna2: "Calorias: 480 kcal<br>Rico em antioxidantes e fibras.<br>Ajuda na digestão e imunidade.",
    },
    3: {
      titulo: "Quarta-feira",
      descricao: "Carne moída, arroz branco, feijão preto, purê de batata e refresco de maracujá.",
      imagem: "../IMAGENS/imagem 4.jpeg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 28g<br>Carboidratos: 60g<br>Gorduras: 12g<br>Fibras: 3g",
      coluna2: "Calorias: 530 kcal<br>Refeição equilibrada e rica em ferro.<br>Boa para energia e força física.",
    },
    4: {
      titulo: "Quinta-feira",
      descricao: "Peixe grelhado, arroz com legumes, feijão carioca, salada de tomate e suco de limão.",
      imagem: "../IMAGENS/imagem 3.jpg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 24g<br>Carboidratos: 55g<br>Gorduras: 9g<br>Fibras: 5g",
      coluna2: "Calorias: 460 kcal<br>Rico em ômega-3 e vitamina D.<br>Contribui para a saúde do coração.",
    },
    5: {
      titulo: "Sexta-feira",
      descricao: "Estrogonofe de carne, arroz branco, batata palha, feijão e suco de abacaxi.",
      imagem: "../IMAGENS/Imagem 2.jpeg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 26g<br>Carboidratos: 70g<br>Gorduras: 15g<br>Fibras: 4g",
      coluna2: "Calorias: 600 kcal<br>Refeição mais energética.<br>Boa para o fechamento da semana!",
    },
  };

  // --- POPUP SELEÇÃO DE DIA ---
  botaoAbrirPopup.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  botaoFecharPopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // --- CLICOU NUM DIA DO POPUP ---
  document.querySelectorAll(".dias-calendario button").forEach((botao) => {
    botao.addEventListener("click", () => {
      const dia = parseInt(botao.dataset.dia);
      abrirModalComCardapio(cardapios[dia]);
      popup.style.display = "none";
    });
  });

  // --- FUNÇÃO GERAL DE ABRIR MODAL ---
  function abrirModalComCardapio(card) {
    tituloModal.textContent = card.titulo;
    descricaoModal.textContent = card.descricao;
    imagemModal.src = card.imagem;

    // 🟢 Atualiza o subtítulo e as colunas (novas)
    subtituloModal.textContent = card.subtitulo;
    coluna1Modal.innerHTML = card.coluna1;
    coluna2Modal.innerHTML = card.coluna2;

    modal.style.display = "flex";
  }

  // --- FECHAR MODAL ---
  fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // --- CLICOU EM ALGUM CARD FIXO ---
  const cardsFixos = document.querySelectorAll(".cards-container .card");
  cardsFixos.forEach((card, index) => {
    card.addEventListener("click", () => {
      const dia = index + 1;
      abrirModalComCardapio(cardapios[dia]);
    });
  });
});


// ---------------- FUNÇÕES EXISTENTES ----------------

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
      window.location.href = "eventos.html"
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
