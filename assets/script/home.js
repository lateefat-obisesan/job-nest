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