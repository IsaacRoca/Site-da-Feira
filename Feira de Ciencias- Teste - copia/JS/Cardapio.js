document.addEventListener("DOMContentLoaded", () => {
  initObserver();
  verificarSessao();
  initPerfilDropdown();
  bloqueioRolagemHorizontal();
  ajusteMenuPorTamanho();
  configurarLinks();

  // 🔹 Sistema de exibição do cardápio do dia selecionado
  const inputData = document.getElementById("dataCardapio");
  const cardSelecionado = document.getElementById("cardapio-dia-selecionado");
  const tituloDia = document.getElementById("tituloDia");
  const descricaoDia = document.getElementById("descricaoDia");
  const imagemDia = document.getElementById("imagemDia");

  if (inputData) {
    const cardapios = {
      1: {
        titulo: "Segunda-feira",
        descricao: "Macarrão à bolonhesa, arroz branco, feijão preto, salada verde e suco de laranja natural.",
        imagem: "../IMAGENS/Imagem 2.jpeg",
      },
      2: {
        titulo: "Terça-feira",
        descricao: "Frango assado, arroz integral, feijão carioca, legumes cozidos e suco de uva.",
        imagem: "../IMAGENS/imagem 3.jpg",
      },
      3: {
        titulo: "Quarta-feira",
        descricao: "Carne moída, arroz branco, feijão preto, purê de batata e refresco de maracujá.",
        imagem: "../IMAGENS/imagem 4.jpeg",
      },
      4: {
        titulo: "Quinta-feira",
        descricao: "Peixe grelhado, arroz com legumes, feijão carioca, salada de tomate e suco de limão.",
        imagem: "../IMAGENS/imagem 3.jpg",
      },
      5: {
        titulo: "Sexta-feira",
        descricao: "Estrogonofe de carne, arroz branco, batata palha, feijão e suco de abacaxi.",
        imagem: "../IMAGENS/Imagem 2.jpeg",
      },
    };

    inputData.addEventListener("change", () => {
      const dataSelecionada = new Date(inputData.value + "T00:00");
      const diaSemana = dataSelecionada.getDay(); // 0=Domingo, 1=Segunda, ..., 6=Sábado

      if (diaSemana >= 1 && diaSemana <= 5) {
        const card = cardapios[diaSemana];
        tituloDia.textContent = `${card.titulo} (${dataSelecionada.toLocaleDateString("pt-BR")})`;
        descricaoDia.textContent = card.descricao;
        imagemDia.src = card.imagem;
        imagemDia.alt = `Imagem do cardápio de ${card.titulo}`;
        cardSelecionado.style.display = "block";
      } else {
        tituloDia.textContent = "Dia sem cardápio disponível";
        descricaoDia.textContent = "Selecione uma data entre segunda e sexta-feira.";
        imagemDia.src = "../IMAGENS/imagem 3.jpg";
        imagemDia.alt = "Dia sem cardápio";
        cardSelecionado.style.display = "block";
      }
    });
  }
});

// =================== FUNÇÕES ORIGINAIS ===================

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
      alert("Página de Eventos em desenvolvimento");
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
