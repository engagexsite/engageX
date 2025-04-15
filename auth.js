function register() {
  const email = document.getElementById('register-email').value.trim();
  const senha = document.getElementById('register-senha').value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos.');
    return;
  }

  if (localStorage.getItem(email)) {
    alert('Este e-mail já está registrado.');
    return;
  }

  // Armazena os dados (simples, para fins de demonstração)
  const user = { email, senha };
  localStorage.setItem(email, JSON.stringify(user));

  alert('Conta criada com sucesso!');
  window.location.href = 'login.html';
}

function login() {
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos.');
    return;
  }

  const userData = localStorage.getItem(email);

  if (!userData) {
    alert('Usuário não encontrado.');
    return;
  }

  const user = JSON.parse(userData);

  if (user.senha === senha) {
    localStorage.setItem('usuarioLogado', email);
    window.location.href = 'dashboard.html';
  } else {
    alert('Email ou senha incorretos.');
  }
}
