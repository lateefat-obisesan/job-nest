'use strict';

class User {
    constructor(name, userName, email) {
        this.name = name;
        this.userName = userName;
        this.email = email;
    }

    getInfo() {
        return `
        <div class="profile-card">
            <img src="./assets/media/profile-image.jpg" class="user">
            <h2>${this.name}</h2>
            <p>@${this.userName}</p>
            <p>${this.email}</p>
        </div>
        `;
    }
}

const currentUser = new User(
    "Ade Smith",
    "adesmith",
    "ade@email.com",
);

const postButton = document.getElementById('button');
const textArea = document.getElementById('text');
const fileInput = document.getElementById('file');
const fileNameDisplay = document.getElementById('file-name');
const feed = document.getElementById('feed');
const randomUsersContainer = document.getElementById('random-users');
const logoutBtn= document.getElementById('logout');
const userIcon = document.getElementById('user');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close');
const infoDiv = document.getElementById('modal-info');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = '';
    }
});

userIcon.addEventListener('click', () => {
    infoDiv.innerHTML = currentUser.getInfo();
    modal.classList.remove('hide'); 
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hide'); 
});

postButton.addEventListener ('click', (e) => { 
    e.preventDefault();

     const textValue = textArea.value.trim();
    const file = fileInput.files[0];

    if (!textValue && !file) {
        alert('Please add text or an image.');
        return;
    }

    const postDate = new Date().toLocaleDateString();
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    let imageHtml = '';
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        imageHtml = `<img src="${imageUrl}" class="post-image">`;
    }

    newPost.innerHTML = `
        <div class="post-header">
           <div class="post-left">
                <img src="./assets/media/profile-image.jpg" class="user">
                <span class="post-username">${currentUser.userName}</span>
            </div>
            <span class="post-date">${postDate}</span>
        </div>
        <p style="post-text">${textValue}</p>
        ${imageHtml}
    `;

    feed.prepend(newPost);

    textArea.value = '';
    fileInput.value = '';
    fileNameDisplay.textContent = '';
});

async function fetchConnections() {
   const URL = 'https://www.randomuser.me/api/?nat=CA&results=10&seed=same';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayConnections(data.results);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function displayConnections(users) {
    randomUsersContainer.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('connection-item');
        
        userDiv.innerHTML = `
            <img src="${user.picture.medium}" alt="user">
            <div class="user-info">
                <p>${user.name.first} ${user.name.last}</p>
                <p>${user.location.city}</p>
            </div>
        `;
        randomUsersContainer.appendChild(userDiv);
    });
}

fetchConnections();