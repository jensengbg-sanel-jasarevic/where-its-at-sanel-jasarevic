const jwt = require('jsonwebtoken');

const { Router } = require("express");
const router = new Router();

const { getUsername, getTicketFromOrders, assignVerified } = require('../models/database-functions');
const { matchPassword } = require('../models/hash-password');

router.post('/loginstaff', async (req, res) => {
    const body = req.body;
    console.log ('Staff body: ', body);

    let resObj = {
        success: false
    }

    const user = await getUsername(body);
    console.log('Role: ', user.role);
    
    const isAMatch = await matchPassword(body.password, user.password);
    console.log('isAMatch: ', isAMatch);
    
    if (user && isAMatch) {
        const token = jwt.sign({ id: user.username }, 'a2b1c1', {
            expiresIn: 600 
        })
        resObj.success = true;
        resObj.token = token;
        resObj.role = user.role;
    }
    
    res.send(JSON.stringify(resObj));
});

router.get('/staffisloggedin', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    let resObj = {
        isLoggedIn: false
    }

    if (token !== 'null') {
        const user = jwt.verify(token, 'a2b1c1');
        console.log('Loggedin user jwt verify', user);

        if (user) {
            resObj.isLoggedIn = true;
            resObj.user = user;
        }
    }

    res.send(JSON.stringify(resObj));
});

router.post('/verifyticket', async (req, res) => {
    let body = req.body;

    let resObj = {
        success: false,
        ticket: false,
        message: 'Non existing ticket number'
    };

    const ticket = await getTicketFromOrders(body.ticketIDNumber);
    console.log('Ticket: ', ticket);

     if (ticket && ticket.verified !== true) {
        assignVerified(body.ticketIDNumber);
  
            resObj.success = true;
            resObj.ticket = true;
            resObj.verified = true;
            resObj.message = 'Ticket has been verified'

      } else if (ticket && ticket.verified == true) {
            resObj.success = false,
            resObj.ticket = true,
            resObj.message = 'Ticket has already been verified'
     };

    res.send(JSON.stringify(resObj));
});

module.exports = router;