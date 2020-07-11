const jwt = require('jsonwebtoken');

const { Router } = require("express");
const router = new Router();

const { getEvents, addEvents, getUsername } = require('../models/database-functions');
const { matchPassword } = require('../models/hash-password');

router.get('/getevents', async (req, res) => {

    const events = await getEvents();

    res.send(JSON.stringify(events));
});

router.post('/addevents', async (req, res) => {
    const body = req.body;
    console.log('Body from admin form-input', body)
    
    let addEvent = await addEvents(body);

    let resObj = {
        success: false
    }
    
    if (addEvent) {
        resObj.success = true;
        resObj.message = 'Event added';
    }

    res.send(JSON.stringify(resObj));
});

router.post('/loginadmin', async (req, res) => {
    const body = req.body;
    console.log ('Admin body: ', body);

    let resObj = {
        success: false,
    }

    const user = await getUsername(body);
    console.log('Role: ', user.role);
    
    const isAMatch = await matchPassword(body.password, user.password);
    console.log('isAMatch: ', isAMatch);

    if (user && isAMatch) {
        const token = jwt.sign({ id: user.username }, 'a1b1c1', {
            expiresIn: 600 
        })

        resObj.success = true;
        resObj.token = token;
        resObj.role = user.role;
    }

    res.send(JSON.stringify(resObj));
});

router.get('/adminisloggedin', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log ('Token logged in: ', token)

    let resObj = {
        isLoggedIn: false
    }

    if (token !== 'null') {
        const user = jwt.verify(token, 'a1b1c1');
        console.log('User jwt verify', user);
       
        if (user) {
            resObj.isLoggedIn = true;
            resObj.user = user;
        }
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router;