<script src="https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/dist/bcrypt.min.js"></script>
<script>
let tentativasLogin = 0;

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function register() {
  const email = document.getElementById('register-email').value.trim();
  const senha = document.getElementById('register-senha').value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos.');
    return;
  }

  if (!validarEmail(email)) {
    alert('Digite um e-mail válido.');
    return;
  }

  if (localStorage.getItem(email)) {
    alert('Este e-mail já está registrado.');
    return;
  }

  const hash = await bcrypt.hash(senha, 10);
  const user = { email, senha: hash, verificado: false };
  localStorage.setItem(email, JSON.stringify(user));

  alert('Conta criada! Verifique seu e-mail para ativar a conta.');
  // Simulação de verificação
  setTimeout(() => {
    user.verificado = true;
    localStorage.setItem(email, JSON.stringify(user));
    console.log(`Usuário ${email} verificado.`);
  }, 3000);

  window.location.href = 'login.html';
}

async function login() {
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos.');
    return;
  }

  if (tentativasLogin >= 5) {
    alert('Muitas tentativas. Tente novamente em alguns minutos.');
    return;
  }

  const userData = localStorage.getItem(email);
  if (!userData) {
    alert('Usuário não encontrado.');
    tentativasLogin++;
    return;
  }

  const user = JSON.parse(userData);

  if (!user.verificado) {
    alert('Você precisa verificar seu e-mail antes de fazer login.');
    return;
  }

  const senhaCorreta = await bcrypt.compare(senha, user.senha);
  if (senhaCorreta) {
    localStorage.setItem('usuarioLogado', email);
    window.location.href = 'dashboard.html';
  } else {
    alert('Email ou senha incorretos.');
    tentativasLogin++;
  }
}
</script>
