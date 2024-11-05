// Função para mostrar a tela de registro
function showRegister() {
  document.getElementById("registerPage").classList.remove("hidden");
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("cpfPage").classList.add("hidden");
}

// Função para mostrar a tela de login
function showLogin() {
  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("cpfPage").classList.add("hidden");
}

// Função para registrar um usuário
function registerUser() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  if (username && password) {
      localStorage.setItem(username, password);
      document.getElementById("registerMessage").innerText = "Usuário registrado com sucesso!";
      showLogin();
  } else {
      document.getElementById("registerMessage").innerText = "Preencha todos os campos.";
  }
}

// Função para fazer login
function loginUser() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const storedPassword = localStorage.getItem(username);

  if (storedPassword && storedPassword === password) {
      showCpfPage();
  } else {
      document.getElementById("loginMessage").innerText = "Usuário ou senha incorretos.";
  }
}

// Função para mostrar a tela de CPF
function showCpfPage() {
  document.getElementById("cpfPage").classList.remove("hidden");
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.add("hidden");
}

// Função para gerar CPF
function generateCPF() {
  const randomDigits = () => Math.floor(Math.random() * 9 + 1);
  
  let cpf = Array.from({ length: 8 }, randomDigits);
  cpf.push(Math.floor(Math.random() * 10)); // Nono dígito (região fiscal)

  const calcularDigito = (cpfArray, pesoInicial) => {
      let soma = 0;
      for (let i = 0; i < cpfArray.length; i++) {
          soma += cpfArray[i] * pesoInicial--;
      }
      const resto = (soma * 10) % 11;
      return resto === 10 || resto === 11 ? 0 : resto;
  };

  cpf.push(calcularDigito(cpf, 10)); // Décimo dígito (verifica os 9 primeiros)
  cpf.push(calcularDigito(cpf, 11)); // Décimo primeiro dígito (verifica os 10 primeiros)

  document.getElementById("generatedCPF").innerText = `CPF Gerado: ${formatCPF(cpf.join(''))}`;
}

// Função para validar CPF
function validateCPF() {
  let cpf = document.getElementById("cpfInput").value.replace(/[^\d]/g, '');

  if (cpf.length !== 11) {
      document.getElementById("cpfValidationResult").innerText = "CPF inválido!";
      return;
  }

  const calcularDigito = (cpfArray, pesoInicial) => {
      let soma = 0;
      for (let i = 0; i < pesoInicial - 1; i++) {
          soma += cpfArray[i] * pesoInicial--;
      }
      const resto = (soma * 10) % 11;
      return resto === 10 || resto === 11 ? 0 : resto;
  };

  const isValid = calcularDigito(cpf, 10) == cpf[9] && calcularDigito(cpf, 11) == cpf[10];
  document.getElementById("cpfValidationResult").innerText = isValid ? "CPF válido!" : "CPF inválido!";
}

// Função para formatar CPF
function formatCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para logout
function logout() {
  showLogin();
}
