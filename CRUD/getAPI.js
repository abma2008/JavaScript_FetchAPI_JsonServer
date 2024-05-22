
// This is to get the Customers from customers API:
const displayData = document.querySelector('.display-data');
const displayTable = document.createElement('table')
displayTable.classList.add('table', 'table-responsive', 'display-table')
// deleting all the data:
// creating a button that will delete all using axios:
const delAll = () => {
    // firing sweet alert before deleting all the files:
    Swal.fire({
        icon: 'warning',
        title: 'Deleting all records',
        html: '<h4> are you sure you want to delete all?',
        background: 'black',
        color: 'red',
        showConfirmButton: true,
        showCancelButton: true,
    }).then(async (result) => {
        if ((result.isConfirmed)) {
            let data = await axios.get('http://localhost:5001/customers');
            let customers = await data.data;
            if (customers.length > 0) {
                customers.forEach(async (customer) => {
                    await axios.delete(`http://localhost:5001/customers/${customer.id}`)
                })
                alert('All Records have been deleted....')
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'No Data Found',
                    html: '<strong> the database is empty</strong>',
                    showConfirmButton: false,
                    timer: 2500,
                })
            }
        }
    })
}
// delete one record:
const delOne = (id) => {
    // confirming the deletion of the record:
    Swal.fire({
        icon: "question",
        iconHtml: "?",
        title: `Customer ID: ${id}`,
        html: `<strong>are you sure you want to delete Customer ${id}?</strong>`,
        background: 'black',
        color: 'red',
        showConfirmationButton: true,
        showCancelButton: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            await axios.delete(`http://localhost:5001/customers/${id}`)
        }
    }).catch((error) => {
        console.log(error)
    })
}

// Getting all the data:

const getData = async () => {
    let data = await fetch('http://localhost:5001/customers');
    let customers = await data.json()
    if (customers.length <= 0) {
        displayData.innerHTML = '<h1>No Data to display....</h1>'
    }
    else {
        displayTable.innerHTML = `<thead class="table-header">
           <tr>
           <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th>
           <th>Edit</th><th>delete</th>
           </tr>
           </thead> 
           <tbody>`
        customers.forEach((customer) => {
            displayTable.innerHTML +=
                `
           <tr>
           <td>${customer.id}</td>
           <td>${customer.firstName}</td>
           <td>${customer.lastName}</td>
           <td>${customer.email}</td>
           <td>${customer.phone}</td>
           <td><button class="btn btn-sm btn-warning" onclick="updateOne('${customer.id}')">Edit</button></td>
           <td><button class="btn btn-sm btn-danger" onclick="delOne('${customer.id}')">delete</button></td>
           </tr>

            `
        })
        displayTable.innerHTML += `</tbody>`
        displayData.appendChild(displayTable)
    }
}

// activating window.onload to display the results:
window.onload = () => {
    getData();
}


// This is the portion dedicated for using sweetalert2 to accept more than one value

let updateOne = async (id) => {
    const { value: Values } = await Swal.fire({
        title: `Modifying ID: ${id}`,
        html:
            `<input type="text" class="swal2-input" id="firstName" placeholder="Enter First Name">
            <input type="text" class="swal2-input" id="lastName" placeholder="Enter Last Name">
            <input type="email" class="swal2-input" id="email" placeholder="Enter Email">
            <input type="number" class="swal2-input" id="phone" placeholder="Enter Phone">`,
        showCancelButton: true,
    })
    if (Values) {
        let editCustomer = {
            firstName: `${document.querySelector("#firstName").value}`,
            lastName: `${document.querySelector("#lastName").value}`,
            email: `${document.querySelector("#email").value}`,
            phone: `${document.querySelector("#phone").value}`
        }
        let options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editCustomer)
        }
        await fetch(`http://localhost:5001/customers/${id}`, options)
    }
}


// add Customer using AlertForm:
let alertForm = async () => {
    const { value: CustomerValues } = await Swal.fire({
        icon: 'info',
        title: ' Adding Customer through SweetAlert2',
        background: 'black',
        color: 'white',
        showCancelButton: true,
        html:
            `
        <form autocomplete="off">
        <input type="text" class="swal2-input" id="customer_name" placeholder="Enter First Name" required>
        <input type="text" class="swal2-input" id="customer_last" placeholder="Enter Last Name" required>
        <input type="email" class="swal2-input" id="customer_email" placeholder="Enter Email Address" required>
        <input type="phone" class="swal2-input" id="customer_phone" placeholder="Enter Phone Number" required>
        </form>
        `
    })
    if (CustomerValues) {
        let content = {
            firstName: `${document.querySelector('#customer_name').value}`,
            lastName: `${document.querySelector('#customer_last').value}`,
            email: `${document.querySelector('#customer_email').value}`,
            phone: `${document.querySelector('#customer_phone').value}`,
        }
        if (content.firstName.length > 0 && content.lastName.length > 0 && content.email.length > 0 && content.phone.length > 0) {
            let options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            }
            Swal.fire({
                icon: "question",
                title: "Confirmation Box",
                html: "Are you sure you want to save?",
                showConfirmButton: true,
                showCancelButton: true,

            }).then(async (result) => {
                if (result.isConfirmed) {

                    await fetch('http://localhost:5001/customers', options)
                }
            })
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Empty fields are not allowed',
                html: 'You cannot save empty strings.',
                timer: 3000
            })
        }

    }

}

// viewGetAPI using window.location.href:
let viewGetAPI = () => {
    window.location.href = '/getAPI.html'
}
