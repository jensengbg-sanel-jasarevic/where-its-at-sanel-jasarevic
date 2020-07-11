const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = low(adapter);

const { v4: uuidv4 } = require('uuid');

module.exports = {

async getEvents() {
    return await db.get('events').value();
},

async addEvents(adminFormInput) {
    const uuid = uuidv4();
    return await db.get('events').push({id: uuid, namn: adminFormInput.nameFormInput, var: adminFormInput.whereFormInput, datum: adminFormInput.dateFormInput, from: adminFormInput.fromFormInput, till: adminFormInput.toFormInput, platser: 0, biljetter: adminFormInput.ticketsFormInput, pris: adminFormInput.priceFormInput}).write();
},

async getUsername(user) {
    return await db.get('users').find({ username: user.username }).value();
},

async showEvent(ticketID) {
    return await db.get('events').find({ id: ticketID.eventID }).value();
},

async addOrder(ticket, ticketNumber) {
    let userTicketOrder = ticket; 
    userTicketOrder.biljettnummer = ticketNumber;

    await db.get('orders').push(userTicketOrder).write();
    return userTicketOrder;
},

async getTicketFromOrders(id) {
    return await db.get('orders').find({ biljettnummer: id }).value();
},

async assignVerified(id) {
    return await db.get('orders').find({ biljettnummer: id }).assign({verified: true}).write();
},

};