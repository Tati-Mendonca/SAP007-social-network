import {
  auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail,
} from '../../lib/authfirebase.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('login-container');

  const template = `
  <div class="music-container">
  </div>
  <div class = "main">
    <div class="logo-container">
      <img class="logo" src="/pages/style/logo.png">
    </div>
    <div class="form">
        <div class="error" id="email-required-error">Email é obrigatório</div>
        <div class="error" id="email-invalid-error">Ops, email inválido</div>
        <div class="error" id="password-required-error">Ops, senha inválida</div>
        <div class="error" id="user-invalid-error">Usuário inválido!</div>
        <div class="error" id="password-min-length-error">A senha deve conter pelo menos 6 caracteres.</div>
        <input class="control" type="email" placeholder="Email" id="email" required></input>
        <input class="control" type="password" placeholder="Senha" id="password" required></input>
        <button class="button" id="button" disable="true">Entrar</button>
        <p class="text-center">OU</p>
        <button class="button" id="bt-google">Entrar com Google</button>
        <p class="bt-register" id="recover-password" disable="true">Esqueceu sua senha?</p>
        <p class="register"> Não tem registro? <a href="#register">Cadastre-se</a></p>
    </div>
    </div>
    `;

  container.innerHTML = template;

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

  const loginEmailPassword = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log(userLogin.user);
      window.location.href = '#feed';

      // alert('usuario logado');
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

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

  // RECUPERAR SENHA FIREBASE
  function recoverPassword() {
    const email = document.getElementById('email').value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Email de recuperação de senha foi enviado!');
      })
      .catch((error) => {
        alert(getErrorMessage(error));
      });
  }

  const form = {
    recoverPassword: () => document.getElementById('recover-password'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    loginButton: () => document.getElementById('button'),
  };

  // validador do Email
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

  // validador do Password

  function isPasswordValid() {
    return !!form.password().value;
  }

  function buttonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disable = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
  }

  function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block';
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
    buttonsDisable();
  }

  function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';
    form.passwordMinLengthError().style.display = password.length >= 6 ? 'none' : 'block';
    buttonsDisable();
  }

  container.querySelector('#recover-password').addEventListener('click', recoverPassword);
  container.querySelector('#password').addEventListener('keyup', onChangePassword);
  container.querySelector('#email').addEventListener('change', onChangeEmail);
  container.querySelector('#bt-google').addEventListener('click', loginGoogle);
  container.querySelector('#button').addEventListener('click', loginEmailPassword);

  return container;
};
