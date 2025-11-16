
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
  const diasCalendarioContainer = document.querySelector(".dias-calendario");

  window.modalOverlay = document.getElementById("modal");
  window.modalContent = window.modalOverlay ? window.modalOverlay.querySelector(".modal-content") : null;
  const fecharModalBtn = document.getElementById("fecharModal");
  const imagemModal = document.getElementById("imagemModal");
  const tituloModal = document.getElementById("tituloModal");
  const descricaoModal = document.getElementById("descricaoModal");
  const subtituloModal = document.getElementById("subtituloModal");
  const coluna1Modal = document.getElementById("coluna1Modal");
  const coluna2Modal = document.getElementById("coluna2Modal");
  const coluna3Modal = document.getElementById("coluna3Modal");
  const coluna4Modal = document.getElementById("coluna4Modal");
  const coluna5Modal = document.getElementById("coluna5Modal"); 

  // --------- DADOS (edite aqui) ----------
  // cardapios: Esses dados sao dos cards fixos do site, ou seja, os dados dessa semana (semana atual). Esse codigo esta relacionado com os dados da semana atual do pumpop tambem
  const cardapios = {
    1: {
      titulo: "Segunda-feira",
      descricao: "Macarrão à bolonhesa, arroz branco, feijão preto, salada verde e suco de laranja natural.",
      imagem: "../IMAGENS/Imagem 2.jpeg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 22g",
      coluna2: "Calorias: 420kcal",
      coluna3: "Carboidratos: 65g",
      coluna4: "Gorduras: 10g",
      coluna5: "Fibras: 4g"
    },
    2: {
      titulo: "Terça-feira",
      descricao: "Frango assado, arroz integral, feijão carioca, legumes cozidos e suco de uva.",
      imagem: "../IMAGENS/imagem 3.jpg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 25g",
      coluna2: "Calorias: 400kcal",
      coluna3: "Carboidratos: 58g",
      coluna4: "Gorduras: 8g",
      coluna5: "Fibras: 5g"
    },
    3: {
      titulo: "Quarta-feira",
      descricao: "Carne moída, arroz branco, feijão preto, purê de batata e refresco de maracujá.",
      imagem: "../IMAGENS/imagem 4.jpeg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 28g",
      coluna2: "Calorias: 480kcal",
      coluna3: "Carboidratos: 60g",
      coluna4: "Gorduras: 12g",
      coluna5: "Fibras: 3g"
    },
    4: {
      titulo: "Quinta-feira",
      descricao: "Peixe grelhado, arroz com legumes, feijão carioca, salada de tomate e suco de limão.",
      imagem: "../IMAGENS/imagem 3.jpg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 24g",
      coluna2: "Calorias: 360kcal",
      coluna3: "Carboidratos: 55g",
      coluna4: "Gorduras: 9g",
      coluna5: "Fibras: 5g"
    },
    5: {
      titulo: "Sexta-feira",
      descricao: "Estrogonofe de carne, arroz branco, batata palha, feijão e suco de abacaxi.",
      imagem: "../IMAGENS/Imagem 2.jpeg",
      subtitulo: "Informações Nutricionais",
      coluna1: "Proteínas: 26g",
      coluna2: "Calorias: 510kcal",
      coluna3: "Carboidratos: 70g",
      coluna4: "Gorduras: 15g",
      coluna5: "Fibras: 4g"
    }
  };

  // cardapiosPorData: para datas fora da semana atual — EDITE MANUALMENTE AQUI
  // formato recomendado de chave: "YYYY-MM-DD" (ex: "2025-11-17")
  // coloque quantas datas quiser. Aqui embaixo estao os exemplos
  const cardapiosPorData = {
    // "2025-11-25": {
    //   titulo: "Especial de Natal",
    //   descricao: "Peru, farofa, arroz e salada...",
    //   imagem: "../IMAGENS/natal.jpg",
    //   subtitulo: "Informações Nutricionais",
    //   coluna1: "Proteínas: xx",
    //  
    // }
  };


  if (botaoAbrirPopup && popup) {
    botaoAbrirPopup.addEventListener("click", () => {
      gerarDiasUteisGrid(); // gerar dinamicamente ao abrir
      popup.style.display = "flex";
    });
  }

  if (botaoFecharPopup && popup) {
    botaoFecharPopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.style.display = "none";
    });
  }

  function gerarDiasUteisGrid() {
    if (!diasCalendarioContainer) return;

    diasCalendarioContainer.innerHTML = ""; // limpa os botões antigos

    const hoje = new Date();
    let inicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    // se hoje for sábado (6) ou domingo (0) — avançar para próxima segunda
    const hojeDia = inicio.getDay();
    if (hojeDia === 6) { // sábado
      inicio.setDate(inicio.getDate() + 2);
    } else if (hojeDia === 0) { // domingo
      inicio.setDate(inicio.getDate() + 1);
    }
    // agora inicio é o primeiro dia útil (pode ser hoje se hoje for útil)

    // último dia do mês
    const ano = inicio.getFullYear();
    const mes = inicio.getMonth();
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();

    // iterar do início até o último dia do mês
    for (let d = inicio.getDate(); d <= ultimoDiaDoMes; d++) {
      const data = new Date(ano, mes, d);
      const dayOfWeek = data.getDay(); // 0(dom),1(seg)...6(sáb)
      if (dayOfWeek === 0 || dayOfWeek === 6) continue; // pular fins de semana

      // formata para exibir "DD/MM"
      const diaStr = String(d).padStart(2, "0");
      const mesStr = String(mes + 1).padStart(2, "0");
      const label = `${diaStr}/${mesStr}`;
      const chaveISO = formatDateISO(data); // "YYYY-MM-DD"

      const btn = document.createElement("button");
      btn.className = "date-item";
      btn.setAttribute("data-date", chaveISO);
      btn.setAttribute("type", "button");
      btn.innerHTML = `<div class="date-label">${label}</div><div class="date-weekday">${weekdayName(data.getDay())}</div>`;

      // destacar hoje (ou se hoje caiu fim de semana mas mostra o próximo util, não marcar)
      const hojeISO = formatDateISO(new Date());
      if (chaveISO === hojeISO) {
        btn.classList.add("dia-hoje");
        // opcional adicionar texto "Hoje" visível
        const badge = document.createElement("div");
        badge.className = "date-badge";
        badge.textContent = "Hoje";
        btn.appendChild(badge);
      }

      btn.addEventListener("click", () => {
        handleDateClick(chaveISO);
      });

      diasCalendarioContainer.appendChild(btn);
    }

    // OBS: o container .dias-calendario deve ser estilizado via CSS (grid)
  }

  // retorna "Segunda", "Terça", etc. (curto)
  function weekdayName(d) {
    const nomes = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return nomes[d] || "";
  }

  function formatDateISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`; // "YYYY-MM-DD"
  }

  // ---------- Ao clicar numa data do pumpop ----------
  function handleDateClick(dataISO) {
    // verificar se data pertence à "semana atual" (segunda..sexta desta semana)
    // definimos semana atual como: segunda da semana de hoje até sexta da semana de hoje
    const hoje = new Date();
    const segundaAtual = getMondayOf(hoje);
    const sextaAtual = new Date(segundaAtual);
    sextaAtual.setDate(segundaAtual.getDate() + 4); // segunda + 4 = sexta

    const clicked = new Date(dataISO);

    // normalizar horas para comparação
    segundaAtual.setHours(0,0,0,0);
    sextaAtual.setHours(23,59,59,999);
    clicked.setHours(12,0,0,0);

    if (clicked >= segundaAtual && clicked <= sextaAtual) {
      // é semana atual -> usar cardapios por dia da semana (1..5)
      const weekday = clicked.getDay(); // 1=Seg .. 5=Sex
      const index = weekday; // 1..5
      if (index >=1 && index <=5 && cardapios[index]) {
        abrirModalComCardapio(cardapios[index]);
      } else {
        abrirModalVazio(dataISO);
      }
    } else {
      // fora da semana atual -> buscar em cardapiosPorData
      if (cardapiosPorData[dataISO]) {
        abrirModalComCardapio(cardapiosPorData[dataISO]);
      } else {
        abrirModalVazio(dataISO);
      }
    }
  }

  function getMondayOf(d) {
    // retorna objeto Date representando a segunda da semana do date d
    const dt = new Date(d);
    const day = dt.getDay();
    const diff = (day === 0) ? -6 : (1 - day); // se domingo, volta 6 dias; caso contrário ajustar para segunda
    dt.setDate(dt.getDate() + diff);
    dt.setHours(0,0,0,0);
    return dt;
  }

  // ---------- abrir modal com objeto padrão (usa campos que definimos) ----------
  function abrirModalComCardapio(card) {
    if (!card) return;

    // set imagem
    if (imagemModal) {
      imagemModal.src = card.imagem || "";
      imagemModal.alt = card.titulo || "Imagem do prato";
    }

    if (tituloModal) tituloModal.textContent = card.titulo || "";
    if (descricaoModal) descricaoModal.textContent = card.descricao || "";
    if (subtituloModal) subtituloModal.textContent = card.subtitulo || "";

    // preencher colunas 1..5 (cria conteúdo HTML)
    const criarLinha = (texto) => {
      return texto ? `<div class="modal-info-line">${texto}</div>` : `<div class="modal-info-line nao-preenchido">—</div>`;
    };

    // Se os elementos específicos não existirem no HTML, vamos criar/inserir dentro da estrutura existente:
    ensureModalColumnElements();

    if (coluna1Modal) coluna1Modal.innerHTML = criarLinha(card.coluna1);
    if (coluna2Modal) coluna2Modal.innerHTML = criarLinha(card.coluna2);
    if (coluna3Modal) coluna3Modal.innerHTML = criarLinha(card.coluna3);
    if (coluna4Modal) coluna4Modal.innerHTML = criarLinha(card.coluna4);
    if (coluna5Modal) coluna5Modal.innerHTML = criarLinha(card.coluna5);

    openModal();
  }

  // Se não existir cardápio para a data, mostramos um modal com aviso e opção de fechar
  function abrirModalVazio(dataISO) {
    const vazio = {
      titulo: `Sem cardápio cadastrado`,
      descricao: `Não há um cardápio registrado para ${formatDateDisplay(dataISO)}.`,
      imagem: "",
      subtitulo: "",
      coluna1: "",
      coluna2: "",
      coluna3: "",
      coluna4: "",
      coluna5: ""
    };
    abrirModalComCardapio(vazio);
  }

  function formatDateDisplay(iso) {
    // iso: "YYYY-MM-DD" -> "DD/MM/YYYY"
    const parts = iso.split("-");
    if (parts.length !== 3) return iso;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  // Garante que existam elementos coluna1Modal..coluna5Modal no DOM do modal,
  // para que possamos inserir os 5 lines. Se não existirem, criamos dentro da .card-conteudo do modal.
  function ensureModalColumnElements() {
    // tenta obter novamente (caso mudado)
    const modalCardConteudo = window.modalContent ? window.modalContent.querySelector(".card-conteudo") : null;
    if (!modalCardConteudo) return;

    // procurar elementos existentes por id
    let c1 = modalCardConteudo.querySelector("#coluna1Modal");
    let c2 = modalCardConteudo.querySelector("#coluna2Modal");
    let c3 = modalCardConteudo.querySelector("#coluna3Modal");
    let c4 = modalCardConteudo.querySelector("#coluna4Modal");
    let c5 = modalCardConteudo.querySelector("#coluna5Modal");

    // se já existem, referenciar as variáveis externas
    if (c1 && c2 && c3 && c4 && c5) {
      // Atualiza referências globais
      window.coluna1Modal = c1; window.coluna2Modal = c2; window.coluna3Modal = c3; window.coluna4Modal = c4; window.coluna5Modal = c5;
      // também atualizar os const locais
      // (nota: as constantes declaradas no topo são somente leituras, então setamos as variáveis locais se precisarmos)
    } else {
      // criar contêiner para linhas (se não houver)
      // vamos remover qualquer .modal-colunas antigo para criar o layout vertical (5 lines) do jeito que pediu.
      let cont = modalCardConteudo.querySelector(".modal-colunas");
      if (cont) cont.remove();

      const novoCont = document.createElement("div");
      novoCont.className = "modal-colunas-vertical";

      const criarDivCol = (id) => {
        const div = document.createElement("div");
        div.id = id;
        div.className = "coluna-modal linha-modal";
        return div;
      };

      const div1 = criarDivCol("coluna1Modal");
      const div2 = criarDivCol("coluna2Modal");
      const div3 = criarDivCol("coluna3Modal");
      const div4 = criarDivCol("coluna4Modal");
      const div5 = criarDivCol("coluna5Modal");

      novoCont.appendChild(div1);
      novoCont.appendChild(div2);
      novoCont.appendChild(div3);
      novoCont.appendChild(div4);
      novoCont.appendChild(div5);

      modalCardConteudo.appendChild(novoCont);

      // atualizar referências globais/locais
      window.coluna1Modal = document.getElementById("coluna1Modal");
      window.coluna2Modal = document.getElementById("coluna2Modal");
      window.coluna3Modal = document.getElementById("coluna3Modal");
      window.coluna4Modal = document.getElementById("coluna4Modal");
      window.coluna5Modal = document.getElementById("coluna5Modal");
    }

    // atualizar as referencias locais (se ainda não definidas)
    if (!window.coluna1Modal) window.coluna1Modal = document.getElementById("coluna1Modal");
    if (!window.coluna2Modal) window.coluna2Modal = document.getElementById("coluna2Modal");
    if (!window.coluna3Modal) window.coluna3Modal = document.getElementById("coluna3Modal");
    if (!window.coluna4Modal) window.coluna4Modal = document.getElementById("coluna4Modal");
    if (!window.coluna5Modal) window.coluna5Modal = document.getElementById("coluna5Modal");
  }

  // ---------- openModal / closeModal (mantive sua animação) ----------
  function openModal() {
    if (!window.modalOverlay || !window.modalContent) return;
    window.modalOverlay.style.display = "flex";
    window.modalOverlay.classList.remove("closing");
    window.modalContent.classList.remove("closing");
    window.modalOverlay.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!window.modalOverlay || !window.modalContent) {
      if (window.modalOverlay) window.modalOverlay.style.display = "none";
      return;
    }
    window.modalOverlay.classList.add("closing");
    window.modalContent.classList.add("closing");
    window.modalOverlay.setAttribute("aria-hidden", "true");
    const handler = function () {
      window.modalOverlay.style.display = "none";
      window.modalOverlay.removeEventListener("animationend", handler);
    };
    window.modalOverlay.addEventListener("animationend", handler);
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
      if (e.target === window.modalOverlay) closeModal();
    });
  }

  // fechar com ESC (mantive)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const dropdown = document.getElementById("perfil-dropdown");
      const perfilIcon = document.getElementById("perfilIcon");
      if (dropdown && dropdown.classList.contains("ativo")) {
        dropdown.classList.remove("ativo");
        if (perfilIcon) perfilIcon.setAttribute("aria-expanded", "false");
        dropdown.setAttribute("aria-hidden", "true");
      }
      if (window.modalOverlay && window.getComputedStyle(window.modalOverlay).display !== "none") {
        closeModal();
      }
    }
  });

  // ---------- preencher cards fixos (agora com 5 linhas) ----------
  function preencherCardsFixos() {
    const cardsFixos = document.querySelectorAll(".cards-container .card");
    cardsFixos.forEach((cardEl, index) => {
      // index 0 => segunda (1), index1 => terça (2), ...
      const dayIndex = index + 1; // 1..5
      const dados = cardapios[dayIndex];
      if (!dados) return;

      // imagem
      const imgEl = cardEl.querySelector(".card-imagem img");
      if (imgEl && dados.imagem) {
        imgEl.src = dados.imagem;
        imgEl.alt = dados.titulo || "Imagem do prato";
      }

      // titulo e descricao
      const tituloEl = cardEl.querySelector(".card-conteudo h3");
      const descEl = cardEl.querySelector(".card-conteudo p");
      if (tituloEl) tituloEl.textContent = dados.titulo || "";
      if (descEl) descEl.textContent = dados.descricao || "";

      // clique no card fixo abre modal com os dados correspondentes
      cardEl.addEventListener("click", () => {
        abrirModalComCardapio(dados);
      });
    });
  }

  // preencher cards fixos ao carregar
  preencherCardsFixos();

  // ----------------------------------------------------------
  // Funções auxiliares que já existiam na versão anterior:
  // configurarLinks, initObserver, verificarSessao, initPerfilDropdown,
  // bloqueioRolagemHorizontal, ajusteMenuPorTamanho
  // (mantive sua implementação original — caso deseje ver/revisar eu copio abaixo)
  // ----------------------------------------------------------

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

}); // fim DOMContentLoaded
