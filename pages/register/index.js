import {
  auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateName,
} from '../../lib/authfirebase.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('login-container');

  // Mensagens de erro
  function getErrorMessage(error) {
    if (error.code === 'auth/user-not-found') {
      return 'Usúario não encontrado';
    }
    if (error.code === 'auth/wrong-password') {
      return 'Senha Incorreta';
    }
    if (error.code === 'auth/internal-error') {
      return 'Verifique se você preencheu todos os campos e tente novamente!';
    }
    if (error.code === 'auth/invalid-email') {
      return 'Email invalido, tente novamente!';
    }
    if (error.code === 'auth/popup-closed-by-user') {
      return 'Não foi possivel acessar o Gmail, tente novamente!';
    }
    if (error.code === 'auth/missing-email') {
      return 'Digite um email valido';
    }
    if (error.code === 'auth/email-already-in-use') {
      return 'Já existe uma conta criada com este email';
    }
    if (error.code === 'auth/weak-password') {
      return 'Sua senha precisa ter pelo menos 6 caracteres';
    }
    return error.message;
  }

  const createAccount = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userName = document.getElementById('name').value;
    // console.log(userName);

    await createUserWithEmailAndPassword(auth, email, password);
    try {
      alert('usuario criado e logado');
      updateName(auth.currentUser, userName);
      window.location.href = '#feed';
    } catch (error) {
      alert(getErrorMessage(error.code));
    }
    return auth.currentUser;
    // console.log(userName)
  };

  const template = `
    <div class="music-container">
    </div>
    <div class = "main">
      <div class="logo-container">
      <img class="logo" src="/pages/style/logo.png">
      </div>
        <div class="form">
        <div class="error" id="email-required-error">Email é obrigatório.</div>
        <div class="error" id="email-invalid-error">Ops, email inválido.</div>
        <div class="error" id="password-required-error">Ops, senha inválida.</div>
        <div class="error" id="password-min-length-error">A senha deve conter pelo menos 6 caracteres.</div>
        <div class="error" id="user-required-error">Não se esqueça de criar seu nome de usuário.</div>
        <div class="error" id="user-invalid-error">Nome de usuário inválido.</div>
        <input class="control" type="text" placeholder="Usúario" id="name" required></input>
        <input class="control" type="email" placeholder="Email" id="email" required></input>
        <input class="control" type="password" placeholder="Senha" id="password" required></input>
        <button class="button" id="bt-register" disable="true">Cadastre-se</button>
        <p class="text-center">OU</p>
        <button class="button" id="bt-google">Acesse pelo Google</button>
      </div>
      <p class="register"> Já tem registro? <a href="#login">Faça seu Login</a></p>
      </div>
      `;

  container.innerHTML = template;

  // AUTENTICAÇÃO VIA GOOGLE
  const provider = new GoogleAuthProvider();
  function loginGoogle() {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = '#feed';
        alert('usuario logado');
      })
      .catch((error) => {
        alert(getErrorMessage(error));
      });
  }

  const form = {
    registerButton: () => document.getElementById('bt-register'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    userRequiredError: () => document.getElementById('user-required-error'),
    userInvalidError: () => document.getElementById('user-invalid-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    user: () => document.getElementById('name'),

  };

  // validador do email
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isEmailValid() {
    const email = form.email().value;
    if (!email) {
      return false;
    }
    return validateEmail(email);
  }

  // validador de usuário
  function validateUser(user) {
    return /^[a-zA-Z0-9_]+$/.test(user);
  }
  function isUserValid() {
    const user = form.user().value;
    if (!user) {
      return false;
    }
    return validateUser(user);
  }

  function buttonsDisable() {
    const emailValid = isEmailValid();
    const userValid = isUserValid();
    form.registerButton().disabled = !emailValid || !userValid;
  }

  function onchangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block';
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
    buttonsDisable();
  }

  function onchangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';
    form.passwordMinLengthError().style.display = password.length >= 6 ? 'none' : 'block';
    buttonsDisable();
  }

  function onchangeUser() {
    const user = form.user().value;
    form.userRequiredError().style.display = user ? 'none' : 'block';
    form.userInvalidError().style.display = validateUser(user) ? 'none' : 'block';
    buttonsDisable();
  }

  container.querySelector('#password').addEventListener('keyup', onchangePassword);
  container.querySelector('#email').addEventListener('change', onchangeEmail);
  container.querySelector('#name').addEventListener('change', onchangeUser);
  container.querySelector('#bt-google').addEventListener('click', loginGoogle);
  container.querySelector('#bt-register').addEventListener('click', createAccount);

  return container;
};
