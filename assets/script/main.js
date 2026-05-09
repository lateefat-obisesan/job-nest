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

const permanentPosts = [
    {
        name: "Ade Smith",
        username: "adesmith",
        date: "2026-05-08",
        text: "Hello everyone, I’m excited to officially join this community! I’m passionate about technology, learning new skills, and building meaningful connections with people who love innovation and growth. Currently exploring opportunities, improving my coding skills, and working toward becoming a stronger software developer every day. Let’s connect, learn, and grow together.",
        image: "./assets/media/mountain.jpg" 
    },
    {
        name: "Ade Smith",
        username: "adesmith",
        date: "2026-05-08",
        text: "So pretty!!",
        image: "./assets/media/flower.jpg" 
    }
];

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

let posts = JSON.parse(localStorage.getItem("posts")) || [];

postButton.addEventListener ('click', (e) => { 
    e.preventDefault();

    const textValue = textArea.value.trim();
    const file = fileInput.files[0];

    if (!textValue && !file) {
        alert('Please add text or an image.');
        return;
    }

    const postDate = new Date().toLocaleDateString();
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container'); 

    let imageHtml = '';
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        imageHtml = `<img src="${imageUrl}" class="post-image">`;
    }

    postContainer.innerHTML = `
        <div class="post-header">
            <div class="post-user-info">
                <img src="./assets/media/profile-image.jpg" class="user">
                <span class="post-username">${currentUser.userName}</span>
            </div>
            <span class="post-date">${postDate}</span>
        </div>
        <p class="post-text">${textValue}</p>
        ${imageHtml}
        <div class="post-actions">
            <div class="action-item">
                <i class="fa-regular fa-heart"></i>
                <span>Like</span>
            </div>
            <div class="action-item">
                <i class="fa-regular fa-comment"></i>
                <span>Comment</span>
            </div>
            <div class="action-item">
                <i class="fa-solid fa-share-nodes"></i>
                <span>Share</span>
            </div>
        </div>
    `;

    feed.prepend(postContainer);

    textArea.value = '';
    fileInput.value = '';
    fileNameDisplay.textContent = '';
});

async function fetchConnections() {
   const URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        displayConnections(data.results);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function renderPost(postData) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container'); 

    postContainer.innerHTML = `
        <div class="post-header">
            <div class="post-user-info">
                <img src="./assets/media/profile-image.jpg" class="user">
                <span class="post-username">${postData.username}</span>
            </div>
            <span class="post-date">${postData.date}</span>
        </div>
        <p class="post-text">${postData.text}</p>
        <img src="${postData.image}" class="post-image">
        <div class="post-actions">
            <div class="action-item">
                <i class="fa-regular fa-heart"></i>
                <span>Like</span>
            </div>
            <div class="action-item">
                <i class="fa-regular fa-comment"></i>
                <span>Comment</span>
            </div>
            <div class="action-item">
                <i class="fa-solid fa-share-nodes"></i>
                <span>Share</span>
            </div>
        </div>
    `;
    feed.appendChild(postContainer);
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
            <div class="add-person-btn">
                <i class="fa-solid fa-user-plus"></i>
            </div>
        `;
        randomUsersContainer.appendChild(userDiv);
    });
}

fetchConnections();

permanentPosts.forEach(post => {
    renderPost(post);
});