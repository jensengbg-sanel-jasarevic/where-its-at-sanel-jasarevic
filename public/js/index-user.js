const eventsList = document.querySelector('.events-list');

const baseUrl = 'http://localhost:7000/api/index';

fetch(baseUrl + '/getallevents', { method: 'GET' })
  .then(response => {
    return response.json();
  })
  .then(data => {
    showEvents(data);
  });

const showEvents = data => {
  for (let i = 0; i < data.length; i++) {
    let eventDate = document.createElement('p');
    let theEvent = document.createElement('div');
    let eventHeader = document.createElement('h1');
    let eventPlace = document.createElement('p');
    let eventTimePrice = document.createElement('p');

    eventDate.setAttribute('class', 'event-date');
    theEvent.setAttribute('class', 'this-event');
    eventHeader.setAttribute('class', 'event-header');
    eventHeader.setAttribute('id', `${data[i].id}`);
    eventPlace.setAttribute('class', 'event-place');
    eventTimePrice.setAttribute('class', 'event-time-price');

    eventDate.innerHTML = data[i].datum;
    eventHeader.innerHTML = data[i].namn;
    eventPlace.innerHTML = data[i].var;
    eventTimePrice.innerHTML = data[i].from + ' - ' + data[i].till + '<span class="event-price">' + data[i].pris + ' sek</span>';
    
    eventsList.append(eventDate);
    eventsList.append(theEvent);
    theEvent.append(eventHeader);
    theEvent.append(eventPlace);
    theEvent.append(eventTimePrice);

    addOrder()
}};

function sessionStoreID(eventID) {
  return sessionStorage.setItem('event-id', eventID);
}

function addOrder() {
  const events = document.querySelectorAll('.event-header');

  for (let i = 0; i < events.length; i++) {
      events[i].addEventListener('click',  () => {
          let eventID = events[i].getAttribute('id');
          sessionStoreID(eventID);
          location.href = 'http://localhost:7000/user-order.html';
      });
  }
}