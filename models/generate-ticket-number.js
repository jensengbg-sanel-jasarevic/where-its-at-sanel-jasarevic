module.exports = {

     generateTicketNumber() {
        var result = '';
        var characters = 'ABC123';
        var charactersLength = characters.length;

        for (var i = 0; i < charactersLength; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
     }

}