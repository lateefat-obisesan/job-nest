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
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = '';
    }
});

postButton.addEventListener('click', () => {
    const textValue = textArea.ariaValueMax.trim();
    const file = fileInput.files[0];

    if(!textValue && !file) {
        alert('Please add text or an image before posting.');
        return;
    }

    const postDate = new Date().toLocaleDateString();
    const newPost = document.createElement('div');
    newPost.classList.add('post-card');

    let imageHtml = '';
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        imageHtml = `<img src="${imageUrl}" class="post-image" style="width: 100%; margin-top: 10px;">`;
    }

    newPost.innerHTML = `
        <div class="post-header" style="display: flex; gap: 10px; align-items: center;">
            <img src="./assets/media/profile-image.jpg" width="40" height="40" style="border-radius: 50%;">
            <div>
                <strong>Ade Smith</strong><br>
                <small>${postDate}</small>
            </div>
        </div>
        <p style="margin-top: 10px;">${textValue}</p>
        ${imageHtml}
    `;

    feed.prepend(newPost);

    textArea.value = '';
    fileInput.value = '';
    fileNameDisplay.textContent = '';
});

async function fetchConnections() {
    const url = 'https://randomuser.me/api/?results=10';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayConnections(data.results);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function displayConnections(users) {
    randomUsersContainer.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('connection-item');
        userDiv.style.cssText = "display: flex; gap: 10px; align-items: center; margin-bottom: 15px;";
        
        userDiv.innerHTML = `
            <img src="${user.picture.medium}" alt="user" style="border-radius: 50%; width: 50px;">
            <div>
                <p style="font-weight: 500; margin: 0;">${user.name.first} ${user.name.last}</p>
                <p style="font-size: 0.8rem; color: gray; margin: 0;">${user.location.city}</p>
            </div>
        `;
        randomUsersContainer.appendChild(userDiv);
    });
}

fetchConnections();