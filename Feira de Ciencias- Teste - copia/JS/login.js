document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensagemErro = document.getElementById("mensagemErro");
  const mensagemSucesso = document.getElementById("mensagemSucesso");

  const toggleSenha = document.getElementById("eye-senha");
  const campoSenha = document.getElementById("senha");

  if (localStorage.getItem("sessaoEncerrada")) {
    mensagemSucesso.textContent = "Sessão encerrada com sucesso!";
    mensagemSucesso.classList.add("sucesso", "ativa");

    setTimeout(() => {
      mensagemSucesso.classList.remove("ativa");
      mensagemSucesso.textContent = "";
    }, 3000);

    localStorage.removeItem("sessaoEncerrada");
  }

  if (toggleSenha && campoSenha) {
    toggleSenha.addEventListener("click", () => {
      const tipo = campoSenha.getAttribute("type") === "password" ? "text" : "password";
      campoSenha.setAttribute("type", tipo);
      toggleSenha.classList.toggle("ativo");
    });

    campoSenha.addEventListener("input", () => {
      toggleSenha.style.opacity = campoSenha.value.length > 0 ? "1" : "0";
    });
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const senha = form.senha.value.trim();

    if (!nome || !senha) {
      mostrarMensagem(mensagemErro, "Preencha todos os campos!", "erro");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.nome.toLowerCase() === nome.toLowerCase() && u.senha === senha
    );

    if (!usuarioEncontrado) {
      mostrarMensagem(mensagemErro, "Usuário ou senha incorretos!", "erro");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify({
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email || ""
    }));

    mostrarMensagem(mensagemSucesso, "Logado com sucesso!", "sucesso");
    form.reset();

    setTimeout(() => {
      window.location.href = "Cardapio.html";
    }, 1000);
  });
});

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.classList.remove("sucesso", "erro", "ativa");
  elemento.classList.add(tipo, "ativa");

  setTimeout(() => {
    elemento.classList.remove("ativa");
    elemento.textContent = "";
  }, 3000);
}
