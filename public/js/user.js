$('#submit').on('click', function () {
    event.preventDefault();

    const user = {
        name: $("#icon_prefix").val(),
        email: $("#icon_email").val()
    }
    console.log(user)
    $.ajax({
        method: 'POST',
        url: '/user',
        data: user,
        success: function (uID) {
            window.location.href = '/home/' + uID;
        }
    })

})