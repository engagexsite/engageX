// Referências de elementos
const btnComecar = document.getElementById('btn-comecar');
const btnPlanos = document.getElementById('btn-planos');
const btnVoltar = document.getElementById('btn-voltar');
const btnVoltarInicio = document.getElementById('btn-voltar-inicio');
const menuPrincipal = document.getElementById('menu-principal');
const menuPlanos = document.getElementById('menu-planos');
const menuServico = document.getElementById('menu-servico');
const btnEnviar = document.getElementById('btn-enviar');
const statusEnvio = document.getElementById('status-envio');
const progresso = document.querySelector('.progresso');
const inputLink = document.getElementById('input-link');
const textoStatus = document.getElementById('texto-status');

// Transições entre menus
btnComecar?.addEventListener('click', () => {
  menuPrincipal.style.display = 'none';
  menuServico.style.display = 'block';
});

btnPlanos?.addEventListener('click', () => {
  menuPrincipal.style.display = 'none';
  menuPlanos.style.display = 'block';
});

btnVoltar?.addEventListener('click', () => {
  menuPlanos.style.display = 'none';
  menuPrincipal.style.display = 'block';
});

btnVoltarInicio?.addEventListener('click', () => {
  menuServico.style.display = 'none';
  menuPrincipal.style.display = 'block';
});

// Validação de link TikTok
function validarLinkTikTok(link) {
  const regex = /^https:\/\/www\.tiktok\.com\/(@[\w.-]+|.*\/video\/\d+)/i;
  return regex.test(link);
}

// Envio com validação e barra de progresso
btnEnviar?.addEventListener('click', () => {
  const link = inputLink.value.trim();

  if (!validarLinkTikTok(link)) {
    alert('Por favor, insira um link válido do TikTok.');
    return;
  }

  btnEnviar.disabled = true;
  let tempoRestante = 120;
  const intervaloBtn = setInterval(() => {
    tempoRestante--;
    btnEnviar.textContent = `Aguarde ${tempoRestante}s`;
    if (tempoRestante <= 0) {
      clearInterval(intervaloBtn);
      btnEnviar.disabled = false;
      btnEnviar.textContent = 'Enviar Pedido';
    }
  }, 1000);

  statusEnvio.classList.remove('hidden');
  progresso.style.width = '0%';
  textoStatus.textContent = 'Enviando interações...';

  let progressoAtual = 0;
  const intervaloProgresso = setInterval(() => {
    if (progressoAtual >= 100) {
      clearInterval(intervaloProgresso);
      textoStatus.textContent = 'Interações enviadas com sucesso!';
    } else {
      progressoAtual += 10;
      progresso.style.width = progressoAtual + '%';
    }
  }, 300);
});

// Função de registro
function register() {
  const nome = document.getElementById('register-nome').value;
  const email = document.getElementById('register-email').value;
  const senha = document.getElementById('register-senha').value;

  if (nome && email && senha) {
    const usuario = { nome, senha };
    localStorage.setItem(email, JSON.stringify(usuario));
    alert('Conta criada com sucesso!');
    window.location.href = 'login.html';
  } else {
    alert('Preencha todos os campos.');
  }
}

// Função de login
function login() {
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;
  const dadosUsuario = localStorage.getItem(email);

  if (dadosUsuario) {
    const usuario = JSON.parse(dadosUsuario);
    if (usuario.senha === senha) {
      localStorage.setItem('usuarioLogado', email);
      window.location.href = 'dashboard.html';
    } else {
      alert('Senha incorreta.');
    }
  } else {
    alert('Usuário não encontrado.');
  }
}

// Preencher nome no dashboard
window.addEventListener('DOMContentLoaded', () => {
  const painel = document.getElementById('dashboard-nome');
  const emailLogado = localStorage.getItem('usuarioLogado');

  if (painel && emailLogado) {
    const dadosUsuario = JSON.parse(localStorage.getItem(emailLogado));
    painel.textContent = dadosUsuario?.nome || 'Usuário';
  }
});


