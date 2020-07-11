    const verifyButton = document.getElementById('verify-submit')
    
    function getToken() {
        return sessionStorage.getItem('auth');
    } 

    isLoggedIn();

    async function isLoggedIn() {
        const token = getToken();
    
        const url = 'http://localhost:7000/api/staff/staffisloggedin';
    
        const response = await fetch(url, { 
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            } 
        });
        const data = await response.json();
        console.log('isLoggedin data: ',data)
    
        if (!data.isLoggedIn) {
            location.href = 'http://localhost:7000/login-staff.html'
        } 
    };

    verifyButton.addEventListener('click', async () => {
        const inputTicketIDNumber = document.getElementById('verify-ticketnumber').value
    
        const Obj =  {
            ticketIDNumber: inputTicketIDNumber
        };
    
        console.log('Obj client: ', Obj);
        const response = await fetch('http://localhost:7000/api/staff/verifyticket'
        , { 
            method: 'POST',
            body: JSON.stringify(Obj),
            headers: { 'Content-Type': 'application/json' }}
            );
        const data = await response.json();
        console.log('Data: ', data)

        if (data.success) {
            alert ('Ticket has been verified');
        }
        else if (data.ticket && data.success !== true) {
            alert ('Ticket has already been verified');
        }
        else {
            alert ('Non existing ticket number');
        };
    });