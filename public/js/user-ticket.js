const ticketNumber = sessionStorage.getItem('ticketnumber');

getOrderTicket()

 async function showTicket (data) {
   
    let ticketEventName = document.querySelector('.ticket-eventname');
    ticketEventName.innerHTML = data.ticket.namn;
    
    let ticketWhere = document.querySelector('.ticket-where');
    ticketWhere.innerHTML = data.ticket.var;
    
    let ticketDate = document.querySelector('.ticket-date');
    ticketDate.innerHTML = data.ticket.datum;
    
    let ticketFromTime = document.querySelector('.ticket-fromtime');
    ticketFromTime.innerHTML = data.ticket.from;
    
    let ticketToTime = document.querySelector('.ticket-totime');
    ticketToTime.innerHTML = data.ticket.till;
    
    let ticketNumberID = document.querySelector('.ticket-numberID');
    ticketNumberID.innerHTML = 'Biljettnummer: ' + data.ticket.biljettnummer;
}

 async function getOrderTicket() {
    const url = `http://localhost:7000/api/index//getorderticket/${ticketNumber}`;
    const response = await fetch(url, {method: 'GET'});
    const data = await response.json();
 
    showTicket(data);
}