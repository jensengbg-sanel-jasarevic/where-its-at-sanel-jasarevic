const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const eventsRouter = require('./routes/route-events');
const staffRouter = require('./routes/route-staff');
const adminRouter = require('./routes/route-admin');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
 
/*
async function hashPassword(passwordToHash) {
    return await bcrypt.hash(passwordToHash, saltRounds);
}
async function matchPassword(userPassword, hash) {
    const match = await bcrypt.compare(userPassword, hash);
    return match;
}

async function getPass() {
const myPlaintextPassword = 'staff123';
console.log(myPlaintextPassword);
const hash = await hashPassword(myPlaintextPassword);
console.log('Hash: ', hash);
const match = await matchPassword(myPlaintextPassword, hash);
console.log('Password match: ', match);
}
getPass()
*/

// Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/staff', staffRouter);
app.use('/api/index', eventsRouter);

app.listen(7000, () => {
    console.log('Server is running');
})