const staffSubmitLogin = document.querySelector('#staff-submit');
const staffUserInput = document.querySelector('#staff-username');
const staffPassInput = document.querySelector('#staff-password');

async function saveToken(token) {
    //return new Promise((resolve, reject) => {
        sessionStorage.setItem('auth', token);
        //resolve('Done');
    //})
}

async function getToken() {
    return await sessionStorage.getItem('auth');
}

async function login(username, password) {
    const url = 'http://localhost:7000/api/staff/loginstaff';
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

    const url = 'http://localhost:7000/api/staff/staffisloggedin';

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();
    console.log('isLoggedin data: ',data)
    if (data.isLoggedIn) {
        location.href = 'http://localhost:7000/staff-verify.html';
    } 
}

staffSubmitLogin.addEventListener('click', async () => {
    const user = staffUserInput.value;
    const pass = staffPassInput.value;

    let loggedIn = await login(user, pass);
    console.log(loggedIn)
    if (loggedIn.success && loggedIn.role === 'staff') {
        saveToken(loggedIn.token);
        isLoggedIn();
    } else {
        alert('Incorrect username or password')
         }
});