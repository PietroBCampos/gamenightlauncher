window.onload = function() {
    const socket = new WebSocket('ws://localhost:3000');

    const correctUsername = 'admin';  // replace with your username
    const correctPassword = 'password';  // replace with your password

    document.getElementById('login').onclick = function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === correctUsername && password === correctPassword) {
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('messagePage').style.display = 'block';
        } else {
            alert('Incorrect username or password!');
        }
    };

    document.getElementById('send').onclick = function() {
        const message = document.getElementById('message').value;
        socket.send(message);
    };
};