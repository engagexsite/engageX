// Elementos principais
const elementos = {
  btnComecar: document.getElementById('btn-comecar'),
  btnPlanos: document.getElementById('btn-planos'),
  btnVoltar: document.getElementById('btn-voltar'),
  btnVoltarInicio: document.getElementById('btn-voltar-inicio'),
  menuPrincipal: document.getElementById('menu-principal'),
  menuPlanos: document.getElementById('menu-planos'),
  menuServico: document.getElementById('menu-servico'),
  btnEnviar: document.getElementById('btn-enviar'),
  statusEnvio: document.getElementById('status-envio'),
  progresso: document.querySelector('.progresso'),
  inputLink: document.getElementById('input-link'),
  textoStatus: document.getElementById('texto-status'),
  spanPlanoAtivo: document.getElementById('plano-ativo')
};

// Limites por plano
const limitesPlano = {
  "Plano Grátis": { curtidas: 50, seguidores: 0, visualizacoes: 1000 },
  "Plano Básico": { curtidas: 200, seguidores: 100, visualizacoes: 10000 },
  "Plano Premium": { curtidas: 500, seguidores: 300, visualizacoes: 25000 }
};

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  const plano = localStorage.getItem("planoSelecionado");
  if (elementos.spanPlanoAtivo && plano) {
    elementos.spanPlanoAtivo.textContent = plano;
  }

  preencherNomeDashboard();
});

// Transições de menus
function trocarMenu(menuEsconder, menuMostrar) {
  menuEsconder.style.display = 'none';
  menuMostrar.style.display = 'block';
}

elementos.btnComecar?.addEventListener('click', () => {
  const plano = localStorage.getItem("planoSelecionado");
  if (!plano) return alert("Escolha um plano antes de começar.");
  trocarMenu(elementos.menuPrincipal, elementos.menuServico);
});

elementos.btnPlanos?.addEventListener('click', () => trocarMenu(elementos.menuPrincipal, elementos.menuPlanos));
elementos.btnVoltar?.addEventListener('click', () => trocarMenu(elementos.menuPlanos, elementos.menuPrincipal));
elementos.btnVoltarInicio?.addEventListener('click', () => trocarMenu(elementos.menuServico, elementos.menuPrincipal));

// Seleção de planos
["gratis", "basico", "premium"].forEach(tipo => {
  document.getElementById(`plano-${tipo}`)?.addEventListener("click", () => {
    const nomePlano = `Plano ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    localStorage.setItem("planoSelecionado", nomePlano);
    elementos.spanPlanoAtivo.textContent = nomePlano;
    trocarMenu(elementos.menuPlanos, elementos.menuServico);
  });
});

// Validação de link TikTok
function validarLinkTikTok(link) {
  const regex = /^https:\/\/www\.tiktok\.com\/(@[\w.-]+|.*\/video\/\d+)/i;
  return regex.test(link);
}

// Envio de interações
elementos.btnEnviar?.addEventListener('click', () => {
  const link = elementos.inputLink.value.trim();
  const plano = localStorage.getItem("planoSelecionado");
  const tipoSelecionado = "curtidas"; // Exemplo fixo

  if (!plano || !limitesPlano[plano]) return alert("Você precisa selecionar um plano válido.");
  if (!validarLinkTikTok(link)) return alert("Por favor, insira um link válido do TikTok.");
  if (limitesPlano[plano][tipoSelecionado] <= 0) {
    return alert(`Seu plano não permite envio de ${tipoSelecionado}.`);
  }

  iniciarEnvio();
});

function iniciarEnvio() {
  elementos.btnEnviar.disabled = true;
  let tempo = 120;
  const intervalo = setInterval(() => {
    elementos.btnEnviar.textContent = `Aguarde ${tempo--}s`;
    if (tempo < 0) {
      clearInterval(intervalo);
      elementos.btnEnviar.disabled = false;
      elementos.btnEnviar.textContent = 'Enviar Pedido';
    }
  }, 1000);

  elementos.statusEnvio.classList.remove('hidden');
  elementos.progresso.style.width = '0%';
  elementos.textoStatus.textContent = 'Enviando interações...';

  let progresso = 0;
  const progressoInterval = setInterval(() => {
    progresso += 10;
    elementos.progresso.style.width = `${progresso}%`;
    if (progresso >= 100) {
      clearInterval(progressoInterval);
      elementos.textoStatus.textContent = 'Interações enviadas com sucesso!';
    }
  }, 300);
}

// Registro
function register() {
  const nome = document.getElementById('register-nome')?.value;
  const email = document.getElementById('register-email')?.value;
  const senha = document.getElementById('register-senha')?.value;

  if (!nome || !email || !senha) return alert('Preencha todos os campos.');

  localStorage.setItem(email, JSON.stringify({ nome, senha }));
  alert('Conta criada com sucesso!');
  window.location.href = 'login.html';
}

// Login
function login() {
  const email = document.getElementById('login-email')?.value;
  const senha = document.getElementById('login-senha')?.value;
  const dados = localStorage.getItem(email);

  if (!dados) return alert('Usuário não encontrado.');
  const usuario = JSON.parse(dados);
  if (usuario.senha !== senha) return alert('Senha incorreta.');

  localStorage.setItem('usuarioLogado', email);
  window.location.href = 'dashboard.html';
}

// Nome no dashboard
function preencherNomeDashboard() {
  const painel = document.getElementById('dashboard-nome');
  const email = localStorage.getItem('usuarioLogado');
  if (painel && email) {
    const dados = JSON.parse(localStorage.getItem(email));
    painel.textContent = dados?.nome || 'Usuário';
  }
}

