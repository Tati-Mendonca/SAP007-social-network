// eslint-disable-next-line
import { auth, loggedIn } from "./lib/authfirebase.js";

import home from './pages/home/index.js';
import login from './pages/login/index.js';
import register from './pages/register/index.js';
import feed from './pages/feed/index.js';

const main = document.querySelector('#root');

function redirect() {
  switch (window.location.hash) {
    case '#login':
      main.appendChild(login());
      break;
    case '#register':
      main.appendChild(register());
      break;
    case '#feed':

      loggedIn((logged) => {
        if (logged) {
          main.appendChild(feed());
        } else window.location.hash = '#home';
      });

      break;
    default:
      main.appendChild(home());
  }
}

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    redirect();
  });
};

window.addEventListener('load', () => {
  redirect();
  init();
});

export function logout() {
  auth.signOut().then(() => {
    window.location.hash = '';
  }).catch(() => {
    alert('Erro ao fazer logout');
  });
}
