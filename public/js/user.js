$(document).on('click', '#submit', function () {
    event.preventDefault();

    const user = {
        name: $("#icon_prefix").val(),
        email: $("#icon_email").val()
    }
    console.log(user)
    $.ajax({
        method: 'POST',
        url: '/user',
        data: user
    })

})