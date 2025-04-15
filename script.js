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
const spanPlanoAtivo = document.getElementById('plano-ativo');

// Exibir plano ativo
document.addEventListener("DOMContentLoaded", () => {
  const plano = localStorage.getItem("planoSelecionado");
  if (spanPlanoAtivo && plano) spanPlanoAtivo.textContent = plano;
});

// Transições entre menus
btnComecar?.addEventListener('click', () => {
  const plano = localStorage.getItem("planoSelecionado");
  if (!plano) {
    alert("Escolha um plano antes de começar.");
    return;
  }
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

// Seleção de planos
document.getElementById("plano-gratis")?.addEventListener("click", () => {
  localStorage.setItem("planoSelecionado", "Plano Grátis");
  spanPlanoAtivo.textContent = "Plano Grátis";
  menuPlanos.style.display = 'none';
  menuServico.style.display = 'block';
});

document.getElementById("plano-basico")?.addEventListener("click", () => {
  localStorage.setItem("planoSelecionado", "Plano Básico");
  spanPlanoAtivo.textContent = "Plano Básico";
  menuPlanos.style.display = 'none';
  menuServico.style.display = 'block';
});

document.getElementById("plano-premium")?.addEventListener("click", () => {
  localStorage.setItem("planoSelecionado", "Plano Premium");
  spanPlanoAtivo.textContent = "Plano Premium";
  menuPlanos.style.display = 'none';
  menuServico.style.display = 'block';
});

// Validação de link TikTok
function validarLinkTikTok(link) {
  const regex = /^https:\/\/www\.tiktok\.com\/(@[\w.-]+|.*\/video\/\d+)/i;
  return regex.test(link);
}

// Limites por plano
const limitesPlano = {
  "Plano Grátis": { curtidas: 50, seguidores: 0, visualizacoes: 1000 },
  "Plano Básico": { curtidas: 200, seguidores: 100, visualizacoes: 10000 },
  "Plano Premium": { curtidas: 500, seguidores: 300, visualizacoes: 25000 }
};

// Envio com validação e barra de progresso
btnEnviar?.addEventListener('click', () => {
  const link = inputLink.value.trim();
  const plano = localStorage.getItem("planoSelecionado");

  if (!plano || !limitesPlano[plano]) {
    alert("Você precisa selecionar um plano válido.");
    return;
  }

  if (!validarLinkTikTok(link)) {
    alert('Por favor, insira um link válido do TikTok.');
    return;
  }

  // Simulação de envio com limites
  const limite = limitesPlano[plano];
  const tipoSelecionado = "curtidas"; // Simulação (pode mudar conforme o botão clicado)

  if (limite[tipoSelecionado] <= 0) {
    alert(`Seu plano não permite envio de ${tipoSelecionado}.`);
    return;
  }

  // Simulação do envio
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


