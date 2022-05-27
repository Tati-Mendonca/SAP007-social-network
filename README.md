<img src= "https://user-images.githubusercontent.com/97405991/167218579-c29f81dc-0941-4042-b5c4-3df7e32f6b0d.png" width=400>

# Criando o Friendsound

## Índice
* [1. Tema](#1-tema)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Interface de usuário](#3-interface-de-usuário)
* [4. Teste de usabilidade](#4-teste-de-usabilidade)
* [5. Demonstração do Projeto](#5-demonstração-do-projeto)
* [6. Como usar](#6-como-usar)
* [7. Ferramentas Utilizadas](#7-ferramentas-utilizadas)
* [8. Desenvolvedoras](#8-desenvolvedoras)

***
## 1. Tema

Instagram, Snapchat, Twitter, Facebook, Twitch, Linkedin, etc. As redes sociais invadiram nossas vidas. Nós as amamos ou odiamos, e muitas pessoas não conseguemviver sem elas.
Há redes sociais de todo tipo para todos os tipos de interesse. E para escolher o tema que iriamos trabalhar, enviamos um formulário a usuários de rede sociais, para compreender quais eram suas necessidades e identificar quem seria nosso público alvo e que tipo de rede social o nosso usuário gostaria que fosse criada.

Através dessa pesquisa criamos 2 photo personas:

<div display: inline>
<img src= "https://user-images.githubusercontent.com/97405991/167228446-ecb50b27-5b2c-44cb-8dac-bf1e66d02feb.png" width=400> <img src= "https://user-images.githubusercontent.com/97405991/167228607-d8cff0c4-9c18-4e44-a1dd-79d98743a9ec.png" width=400>
</div>

## 2. Resumo do projeto

O objetivo deste projeto foi construir uma plataforma que conecta-se às pessoas através da música. Criamos a rede social FriendSound como um espaço onde pessoas com o mesmo gosto musical possam trocar ideias, fazer amizades, conhecer novos artistas e ficar sabendo de shows. Nela o usuário pode criar uma conta de acesso, logar-se com ela, realizar postagens, editar, apagar e dar like nas publicações de seus amigos.
Nosso desafio como desenvolvedoras foi construir uma Rede Social usando Single Page Application e utilizando um banco de dados remoto, para salvar, ler e modificar os dados existentes.
O projeto todo foi desenvolvido utilizando [Firebase](https://firebase.google.com/), Vanilla JavaScript, HTML5 e CSS3.

## 3. Interface do usuário

### Protótipo mobile

![Captura de tela 2022-04-16 133159](https://user-images.githubusercontent.com/97405991/167222321-2c783c94-b87e-4c7c-ae7a-8f7d433805a9.jpg)

### Protótipo desktop

![Prototyping in Figma (2)](https://user-images.githubusercontent.com/97405991/167223553-4994507e-29aa-4575-92d7-1762c7337e97.png)

## 4. Teste de usabilidade

A princípio nosso projeto tinha apenas 3 páginas, e o usuário poderia realizar o cadastro e logar no aplicativo na mesma tela, porém durante o teste de usabilidade identificamos que manter a página de cadastro e login juntas deixava o layout muito poluído e fluxo ficava um pouco confuso para o usuario. Sendo assim pensando na experiência do usuário, optamos por criar uma tela adicional de registro para facilitar o fluxo de autenticação do usuário.

Além disso nos foi reportado que as mensagens de erro de acesso da tela de login eram pequenas e não chamavam muita atenção, podendo passar despercebido pelo usuário. Pensando nisso optamos por alterar o tamanho das letras e as cores dessas mensagens para que elas tivessem mais destaque e o usuário pudesse facilmente identificar o motivo pelo qual ele não conseguiu logar no aplicativo.

## 5. Demonstração do Projeto
<br>
<img alt="login" height="270" width="480" src="src/pages/style/login.gif"> 


<br><img alt="Feed" height="270" width="480" src="src/pages/style/feed.gif">


<br><img alt="Responsividade" height="270" width="480" src="src/pages/style/responsivo.gif">

## 6. Como usar

Visualize o projeto aqui: (https://tati-mendonca.github.io/SAP007-social-network/)

Você precisará usar o Node.js

Clonar o projeto

` $ git clone https://github.com/Tati-Mendonca/SAP007-social-network.git`

Instalar as dependências do projeto

` $ npm install or yarn`

Iniciar a aplicação

` $ npm start or yarn start`

Realizar os testes unitários

` $ npm test or yarn test`

## 7. Ferramentas Utilizadas

<div style="align-items: center;">
    <img alt="Js" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
    <img alt="HTML" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg">
    <img alt="Css" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg">
    <img alt="Figma" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/figma/figma-original.svg">
    <img alt="Firebase" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/firebase/firebase-plain.svg">
</div>

## 8. Desenvolvedoras

| [<img src="https://avatars.githubusercontent.com/u/97405991?v=4" width=115><br><sub>Tatiane Mendonça</sub>](https://github.com/Tati-Mendonca) |  [<img src="https://avatars.githubusercontent.com/u/34221101?v=4" width=115><br><sub>Larissa Moreira</sub>](https://github.com/la4ri) |  [<img src="https://avatars.githubusercontent.com/u/88164568?v=4" width=115><br><sub>Keila Hadama</sub>](https://github.com/hadamakei)  |
| :---: | :---: | :---:
