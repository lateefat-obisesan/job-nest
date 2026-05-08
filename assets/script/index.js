'use strict';

localStorage.setItem("username", "ade");
localStorage.setItem("password", "1234");

'use strict';

localStorage.setItem('username', 'admin');
localStorage.setItem('password', '1234');

const loginForm = document.querySelector('#login-form');

const username = document.querySelector('#username');

const password = document.querySelector('#password');

const loginError = document.querySelector('#login-error');

loginForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const savedUsername = localStorage.getItem('username');

    const savedPassword = localStorage.getItem('password');

    if (
        username.value === savedUsername &&
        password.value === savedPassword
    ) {

        localStorage.setItem('isLoggedIn', 'true');

        window.location.href = './main.html';

    } else {

        loginError.textContent =
        'Incorrect username or password';
    }
});

