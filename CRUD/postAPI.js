// message status for Sweet Alert to use:
let checkingStatus = false;

// Posting the information to customers database:
document.querySelector('#postBtn').addEventListener('click', async function (e) {
    // trying to prevent default refreshing of the page:
    e.preventDefault();
    // setting the content
    let content = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value
    }
    // setting the options
    let options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
    }
    // using the post using fetch:
    let postCustomer = await fetch('http://localhost:5001/customers', options)
    let result = await postCustomer.data
    if (postCustomer.status === 201) {
        checkingStatus = true
    }
    else {
        Swal.fire({
            html: 'Something went wrong',
            timer: 2500
        })
    }
    if (checkingStatus === true) {
        Swal.fire({
            title: 'The record has been successfully saved..'
        }).then((result) => {
            if (result.isConfirmed) {
                // redirecting to getAPI.html:
                window.location.href = `http://127.0.0.1:5500/getAPI.html`
            }
        })
    }



})