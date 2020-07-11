const adminAddButton = document.querySelector('#admin-add-submit');
let adminGetEvents = document.querySelector('.admin-getevent');

function getToken() {
    return sessionStorage.getItem('auth');
} 

isLoggedIn();

async function isLoggedIn() {
    const token = getToken();

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
        getEvents();
    } else if (!data.isLoggedIn) {
        location.href = 'http://localhost:7000/login-admin.html'
    } 
};

async function getEvents() {
    const url = 'http://localhost:7000/api/admin/getevents';
    const response = await fetch(url, {method: 'GET'});
    const data = await response.json();
    showEvents(data);
};

async function showEvents(events) {
    let adminName = document.createElement('ul');
    adminName.classList.add('admin-name');
    adminName.innerHTML += 'NAMN';
   
    let adminWhere = document.createElement('ul');
    adminWhere.classList.add('admin-where');
    adminWhere.innerHTML += 'VAR';

    let adminQuantity = document.createElement('ul');
    adminQuantity.classList.add('admin-quantity');
    adminQuantity.innerHTML += 'ANTAL PLATSER';

    let adminSoldTickets = document.createElement('ul');
    adminSoldTickets.classList.add('admin-soldtickets');
    adminSoldTickets.innerHTML += 'SÅLDA BILJETTER';

    for(event of events) {    
        let adminEventName = document.createElement('li');
        adminEventName.classList.add('admin-eventname');
        adminEventName.innerHTML += event.namn;

        let adminPlace = document.createElement('li');
        adminPlace.classList.add('admin-place');
        adminPlace.innerHTML += event.var;

        let adminQuantityNumber = document.createElement('li');
        adminQuantityNumber.classList.add('admin-quantitynumber');
        adminQuantityNumber.innerHTML += event.platser;

        let adminTicketsSold = document.createElement('li');
        adminTicketsSold.classList.add('admin-ticketssold');
        adminTicketsSold.innerHTML += event.biljetter;

         adminName.append(adminEventName);
         adminWhere.append(adminPlace);
         adminQuantity.append(adminQuantityNumber);
         adminSoldTickets.append(adminTicketsSold);
         adminGetEvents.append(adminName, adminWhere, adminQuantity, adminSoldTickets);
    }
};

async function addEvent(event) {
    try {
        const url = 'http://localhost:7000/api/admin/addevents';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        return await data;

    } catch(error) {
        console.log('Error', error);
    }
};

async function clearShowEvents() {
    adminGetEvents.innerHTML = '';
}

adminAddButton.addEventListener('click', () => {
const formName = document.querySelector('#admin-add-name');
const formWhere = document.querySelector('#admin-add-where');
const formDate = document.querySelector('#admin-add-date');
const formFrom = document.querySelector('#admin-add-from');
const formTo = document.querySelector('#admin-add-to');
const formTickets = document.querySelector('#admin-add-tickets');
const formPrice = document.querySelector('#admin-add-price');

    let formObj = {
        nameFormInput: formName.value,
        whereFormInput: formWhere.value,
        dateFormInput: formDate.value,
        fromFormInput: formFrom.value,
        toFormInput: formTo.value,
        ticketsFormInput: parseInt (formTickets.value),
        priceFormInput: parseInt (formPrice.value)
    }
    clearShowEvents();
    addEvent(formObj);
    getEvents();
});