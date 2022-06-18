export default () => {
  const container = document.createElement('div');
  container.classList.add('home-container');

  const template = `
  <div class="img-container photo">
  </div>
  <div class="logo-container">
    <img class="logo" src="/pages/style/logo.png">
    <h2 class="text">Faça amigos e compartilhe interesses musicais</h2>
    <button class="button-home" id="button">Entrar</button>
  </div>
    `;

  container.innerHTML = template;

  function teste() {
    window.location.href = '#login';
  }

  container.querySelector('#button').addEventListener('click', teste);

  return container;
};
