const { Router } = require('express');
const router = new Router();

const { generateTicketNumber } = require('../models/generate-ticket-number');

const { getEvents, showEvent, addOrder, getTicketFromOrders } = require('../models/database-functions');

router.get('/getallevents', async (req, res) => {
    const events = await getEvents();

    res.send(JSON.stringify(events));
});

router.post('/order', async (req, res) => {
    const body = req.body;
    console.log('Body: ', body)

    let ticket = await showEvent(body);
    console.log('Ticket: ', ticket)

    let resObj = {
        id: ticket.id,
        name: ticket.namn,
        where: ticket.var,
        date: ticket.datum,
        from: ticket.from,
        to: ticket.till,
        price: ticket.pris
    }    
    console.log('Obj: ', resObj)
    res.send(JSON.stringify(resObj));
});

router.post('/addorder', async (req, res) => {
    const body = req.body;
    const ticketNumber = generateTicketNumber();
    const addticket = await addOrder(body.order, ticketNumber);

    res.send(JSON.stringify(addticket));
});

router.get('/getorderticket/:id', async (req, res) => {
    const id = req.params.id;    
    console.log('Id: ', id)

    let getTicket = await getTicketFromOrders(id);

    let resObj = {
        ticket: getTicket
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;