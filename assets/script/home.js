'use strict';

const postButton = document.getElementById('button');
const textArea = document.getElementById('text');
const fileInput = document.getElementById('file');
const fileNameDisplay = document.getElementById('file-name');
const feed = document.getElementById('feed');
const randomUsersContainer = document.getElementById('random-users');
const logoutBtn= document.getElementById('logout');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
})