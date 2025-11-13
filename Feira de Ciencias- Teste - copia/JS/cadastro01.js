document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");
  const mensagemErro = document.getElementById("mensagemErro");
  const mensagemSucesso = document.getElementById("mensagemSucesso");

  const senhaInput = document.getElementById("senha");
  const confirmarInput = document.getElementById("confirmarSenha");
  const toggleSenha = document.getElementById("eye-senha");
  const toggleConfirmar = document.getElementById("eye-confirmar");

  if (toggleSenha && senhaInput) {
    toggleSenha.addEventListener("click", () => {
      const tipo = senhaInput.getAttribute("type") === "password" ? "text" : "password";
      senhaInput.setAttribute("type", tipo);
      toggleSenha.classList.toggle("ativo");
    });

    senhaInput.addEventListener("input", () => {
      toggleSenha.style.opacity = senhaInput.value.length > 0 ? "1" : "0";
    });
  }

  if (toggleConfirmar && confirmarInput) {
    toggleConfirmar.addEventListener("click", () => {
      const tipo = confirmarInput.getAttribute("type") === "password" ? "text" : "password";
      confirmarInput.setAttribute("type", tipo);
      toggleConfirmar.classList.toggle("ativo");
    });

    confirmarInput.addEventListener("input", () => {
      toggleConfirmar.style.opacity = confirmarInput.value.length > 0 ? "1" : "0";
    });
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const senha = form.senha.value.trim();
    const confirmarSenha = form.confirmarSenha.value.trim();

    if (!nome || !email || !senha || !confirmarSenha) {
      mostrarMensagem(mensagemErro, "Preencha todos os campos!", "erro");
      return;
    }

    if (senha !== confirmarSenha) {
      mostrarMensagem(mensagemErro, "As senhas não coincidem!", "erro");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuarios.find(
      (u) => u.nome.toLowerCase() === nome.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
    );

    if (usuarioExistente) {
      mostrarMensagem(mensagemErro, "Usuário ou e-mail já cadastrados!", "erro");
      return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    form.reset();
    toggleSenha.style.opacity = "0";
    toggleConfirmar.style.opacity = "0";

    mostrarMensagem(mensagemSucesso, "Cadastro bem-sucedido!", "sucesso");
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
