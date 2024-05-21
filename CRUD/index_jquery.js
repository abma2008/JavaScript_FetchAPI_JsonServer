// calling the jquery 
$(document).ready(function () {
    // Hiding form and showing show form button:
    $('.form-customers').on('dblclick', function () {
        $('.form-customers').slideUp(2000);
        $('#buttons').slideUp(2000);
        $('#show-form').slideDown(2000);
    })
    // Hiding show form button and bring the form-customers:
    $('#show-form').on('click', function () {
        $('.form-customers').slideDown(2000);
        $('#buttons').slideDown(2000);
        $('#show-form').slideUp(2000);
    })
    // setInterval to keep hiding the hr-container:
    setInterval(() => {
        // adding functionality to hr-separator class:
        $('.hr-container').slideToggle(2000, () => {
            $('.hr-container').html(`${new Date()}`)
        })
    }, 10000);
    // clicking the view-points div to slidetoggle list-points:
    $('.view-points').on('click', () => {
        $('.list-points').slideToggle(3000);
    })
})
