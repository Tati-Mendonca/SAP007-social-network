import { auth } from '../../lib/authfirebase.js';
import {
  dataBase, readDocument, deleteDoc, doc, Timestamp,
  addDocPosts, updateDocPost, updateLikesPost, removeLikePost, updateUserProfile,
} from '../../lib/firestore.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('feed-page-container');

  const user = auth.currentUser;
  const userEmail = user.email;
  const userName = user.displayName;
  const photoURL = user.photoURL;
  updateUserProfile(user, userName, photoURL);
  console.log(userName);

  const template = `
  <div class="feed-bg">
  <button class="btn-logout" id="logout"> Sair</button>
  <h1 class="feed"> Página Inicial</h1>
  <div class="feed-container">
    <div class="feed-posts">
      <form id="submitPost">
      <textarea class="box-feed" id="inputPost" type="text" required placeholder="Qual sua música do momento?" maxlength="140"></textarea>
      <div class="row">
      <button type="submit" class="btn-post">Postar</button> 
      </div> 
      </form>
      <div class="feedpost">
        <ul id="feed"></ul>
      </div>
      </div> 
      <div class="events">
      <img src="./pages/style/logo-events.png" alt="logo-evento" class="logo-events">
          <hr>
        <article>
          <h3>10 de Maio - Show do Metallica</h3>
          <p>ter., 17:00 – 23:59
          Camarote Stadium - Av. Jules Rimet, 250 - Portão 4 - Morumbi
          São Paulo - SP</p>
          <hr>
        </article>
        <article>
          <h3>14 de Maio - Nômade Festival</h3>
          <p>sáb., 12:00 – 23:59
          Memorial da América Latina - Av. Mário de Andrade, 664 - Barra Funda
          São Paulo - SP</p>
          <hr>
        </article>
        <article>
          <h3>22 de Julho - Marisa Monte</h3>
          <p>sex., 22 – sáb., 23 de jul.
          Espaço das Américas - R. Tagipuru, 795 - Barra Funda
          São Paulo - SP</p>
      </article>
      </div>
    </div>
  </div> 
    `;

  container.innerHTML = template;

  // adiciona os novos posts na area do feed dentro da ul
  function showPostOnFeed(
    userId,
    postMessage,
    dateReceived,
    id,
    newPost,
    listaLikes,
    displayName,
  ) {
    console.log(displayName);

    // console.log(listaLikes.length);
    const feed = container.querySelector('#feed');

    const date = dateReceived.toDate();
    let templatePost = '';

    let likedClass = '';

    if (listaLikes.includes(userEmail)) {
      likedClass = ' liked';
    }

    if (userId === user.uid) {
      templatePost = `
      <li class="post" style="display:block" id="">
        <div class="show-post" post-id="${id}" style="display:block">
          <p post-id="${id}" clas="userId" data-userId="${userId}"> Usuário: ${displayName}</p>
          <p post-id="${id}" class="messageContent">Mensagem: ${postMessage}</p>
          <p post-id="${id}" class="date">Data:${date.toLocaleString('pt-BR')}</p>
          <span post-id="${id}" class="count">${listaLikes.length} Curtidas</span>
          <button post-id="${id}" class="editPost">Editar</button>
          <button post-id="${id}" class="deletePost">Deletar</button>
        </div>
          <form class="edit-form" post-id="${id}" style="display:none">
            <div class="container">
            <textarea post-id="${id}" class="edit-text" type="text">${postMessage}</textarea>
            <button post-id="${id}" class="save">Salvar</button>  
            <button post-id="${id}" class="cancel btn">Cancelar</button>
            </div>
          </form>
      </li>
    `;
    } else {
      templatePost = `
      <li class="post" style="display:block" id="">
        <div class="show-post" post-id="${id}" style="display:block">
            <p post-id="${id}" clas="userId" data-userId="${userId} "> Usuário: ${displayName} </p>
            <p post-id="${id}" class="messageContent">Mensagem: ${postMessage}</p>
            <p post-id="${id}" class="date">Data: ${date.toLocaleString('pt-BR')} </p>
          <button post-id="${id}" class="likePost${likedClass}">
            <span post-id="${id}" class="count">${listaLikes.length}</span>Curtir
          </button>
        </div>
      </li>`;
    }
    if (newPost) {
      feed.innerHTML = templatePost + feed.innerHTML;
    } else {
      feed.innerHTML += templatePost;
    }
  }

  // consulta os dados do banco de dados
  readDocument()
    .then((snapshot) => {
      snapshot.docs.forEach((docPost) => {
        // console.log(doc.data().data);
        showPostOnFeed(
          docPost.data().user.userId,
          docPost.data().mensagem,
          docPost.data().data,
          docPost.id,
          false,
          docPost.data().listaLikes,
          docPost.data().user.name,
          console.log(docPost.data().user.name),
        );
      });

      // mostra e esconde o form de editar post
      function showEditPost(button) {
        const postId = button.getAttribute('post-id');
        // console.log(button);
        const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
        // console.log(edit);
        const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);

        if (edit.style.display === 'none') {
          edit.style.display = 'block';
          postFeed.style.display = 'none';
        } else {
          edit.style.display = 'none';
          postFeed.style.display = 'block';
        }
      }

      function deletePost(buttonDelete) {
        const postId = buttonDelete.getAttribute('post-id');
        const postDelete = container.querySelector(`.show-post[post-id="${postId}"]`);
        postDelete.remove();
        return deleteDoc(doc(dataBase, 'postagens', postId));
      }

      // Edita o conteudo do post
      function editForm(postId) {
        let newText = container.querySelector(`.edit-text[post-id="${postId}"]`);
        const newDate = container.querySelector(`.date[post-id="${postId}"]`);
        const postText = container.querySelector(`.messageContent[post-id="${postId}"]`);
        let date = new Date();

        postText.textContent = '';
        newText = newText.value;
        postText.textContent = newText;

        newDate.textContent = '';
        date = date.toLocaleString('pt-BR');
        newDate.textContent = date;

        // manda para banco post editado
        updateDocPost(postId, newText);
      }

      function saveEditPost(button) {
        const postId = button.getAttribute('post-id');
        const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
        const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);
        if (edit.style.display === 'block') {
          editForm(postId);
          edit.style.display = 'none';
          postFeed.style.display = 'block';
        } else {
          edit.style.display = 'block';
          postFeed.style.display = 'none';
        }
      }

      function cancelEditPost(button) {
        const postId = button.getAttribute('post-id');
        const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
        const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);
        if (edit.style.display === 'block') {
          edit.style.display = 'none';
          postFeed.style.display = 'block';
        } else {
          edit.style.display = 'block';
          postFeed.style.display = 'none';
        }
      }

      // ADD documentos posts no banco
      container.querySelector('#submitPost').addEventListener('submit', (e) => {
        e.preventDefault();
        const addPost = container.querySelector('#inputPost');
        let newDate = new Date();
        if (addPost.value) {
          console.log(user.displayName);
          addDocPosts(newDate, addPost, user, user.displayName)
            .then((docRef) => {
              const postMessage = container.querySelector('#inputPost').value;
              const userId = user.uid;
              newDate = Timestamp.now();
              showPostOnFeed(userId, postMessage, newDate, docRef.id, true, [], user.displayName);
              addPost.value = '';

              const btn = container.querySelector(`.editPost[post-id="${docRef.id}"]`);
              if (btn) {
                btn.addEventListener('click', () => {
                  showEditPost(btn);
                });
              }

              const btnDel = container.querySelector(`.deletePost[post-id="${docRef.id}"]`);
              if (btnDel) {
                btnDel.addEventListener('click', () => {
                  alert('Deseja realmente deletar este post?');
                  deletePost(btnDel);
                });
              }

              const btnSave = container.querySelector(`.save[post-id="${docRef.id}"]`);
              if (btnSave) {
                btnSave.addEventListener('click', (event) => {
                  saveEditPost(btnSave);
                  event.preventDefault();
                });
              }

              const btnCancel = container.querySelector(`.cancel[post-id="${docRef.id}"]`);
              if (btnCancel) {
                btnCancel.addEventListener('click', (event) => {
                  event.preventDefault();
                  cancelEditPost(btnCancel);
                });
              }
            });
        }
      });

      function countLikePost(buttonPost) {
        const liked = buttonPost.classList.contains('liked');
        const postId = buttonPost.getAttribute('post-id');
        const countValue = container.querySelector(`.count[post-id="${postId}"]`);
        let countLike = Number(countValue.textContent);

        if (!liked) {
          countLike += 1;
          buttonPost.classList.add('liked');
          updateLikesPost(postId, user.email);
        } else {
          countLike -= 1;
          buttonPost.classList.remove('liked');
          removeLikePost(postId, user.email);
        }
        countValue.textContent = countLike;
      }

      // Ouve botao de editar
      const btn = container.querySelectorAll('.editPost');
      if (btn) {
        btn.forEach((button) => {
          button.addEventListener('click', () => {
            showEditPost(button);
          });
        });
      }

      // botao deletar dados
      const btnDel = container.querySelectorAll('.deletePost');
      if (btnDel) {
        btnDel.forEach((buttonDelete) => {
          buttonDelete.addEventListener('click', () => {
            alert('Deseja realmente deletar este post?');
            deletePost(buttonDelete);
          });
        });
      }

      // botao like e dislike
      const btnPost = container.querySelectorAll('.likePost');
      if (btnPost) {
        btnPost.forEach((buttonPost) => {
          buttonPost.addEventListener('click', () => {
            countLikePost(buttonPost);
          });
        });
      }

      // ouve botao salvar post editado
      const btnSave = container.querySelectorAll('.save');
      if (btnSave) {
        btnSave.forEach((button) => {
          button.addEventListener('click', (event) => {
            saveEditPost(button);
            event.preventDefault();
          });
        });
      }

      const btnCancel = container.querySelectorAll('.cancel');
      if (btnCancel) {
        btnCancel.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            cancelEditPost(button);
          });
        });
      }
    });

  // deslogar do app
  function logout() {
    auth.signOut().then(() => {
      window.location.href = '#';
    });
  }

  container.querySelector('#logout').addEventListener('click', logout);

  return container;
};
