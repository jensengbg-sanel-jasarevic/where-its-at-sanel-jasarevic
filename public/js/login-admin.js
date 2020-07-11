const adminSubmitLogin = document.querySelector('#admin-submit');
const adminUserInput = document.querySelector('#admin-username');
const adminPassInput = document.querySelector('#admin-password');

async function saveToken(token) {
        sessionStorage.setItem('auth', token);
}

async function getToken() {
    return await sessionStorage.getItem('auth');
}

async function login(username, password) {
    const url = 'http://localhost:7000/api/admin/loginadmin';
    const obj = {
        username: username,
        password: password
    }

    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();
    return await data;
}

async function isLoggedIn() {
    const token = await getToken();

    const url = 'http://localhost:7000/api/admin/adminisloggedin';

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();
    console.log('isLoggedin data: ',data)
    if (data.isLoggedIn) {
        location.href = 'http://localhost:7000/admin-getaddevent.html';
    } 
}

adminSubmitLogin.addEventListener('click', async () => {
    const user = adminUserInput.value;
    const pass = adminPassInput.value;

    let loggedIn = await login(user, pass);
    console.log(loggedIn)
    if (loggedIn.success && loggedIn.role === 'admin') {
        saveToken(loggedIn.token);
        isLoggedIn()
    } else {
        alert('Incorrect username or password')
    }
});