function showOrder(order) {
    let orderTicket = document.querySelector('.order-ticket');
    let displayOrder = document.createElement('div');
    displayOrder.classList.add('myTicket');

    displayOrder.innerHTML +=
        '<h1 class="order-eventname">' + order.name + '</h1>' + 
        '<p class="order-date">' + order.date + ' kl ' + order.from + '-' + order.to + '<p>' +  
        '<p class="order-place">' + '@ ' + order.where + '<p>' + 
        '<p class="order-price">' + order.price + ' sek<p>';
    orderTicket.append(displayOrder);

    submitOrder(order);
}

function getSessionID() {
    return sessionStorage.getItem('event-id');
 }

 async function getOrder() {
    const ticketID = await getSessionID();
    const url = 'http://localhost:7000/api/index/order';
    
    let obj = {
        eventID: ticketID
    }
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers : {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Data: ', data)
        showOrder(data);

    } catch(error) {
        console.log('Error', error);
    }
}

function sessionStoreTicketNumber(ticketNumber) {
    sessionStorage.setItem('ticketnumber', ticketNumber);
}

async function addOrder(myOrder) {
    const url = 'http://localhost:7000/api/index/addorder';
    
    let body = {
        order: myOrder
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        sessionStoreTicketNumber(data.biljettnummer);

    } catch(error) {
        console.log('Error', error);
    }
}

function submitOrder(order) {
    const addOrderButton = document.querySelector('#order-submit');
    let myOrder = order;
    
    addOrderButton.addEventListener('click', () => {
        
        let orderObj = {
            id: myOrder.id,
            namn: myOrder.name,
            var: myOrder.where,
            datum: myOrder.date,
            from: myOrder.from,
            till: myOrder.to,
            platser: 0,
            biljetter: 0,
            pris: 0,
            verified: false
        }

        addOrder(orderObj);
        location.href = 'http://localhost:7000/user-ticket.html';
    });
}

getOrder();