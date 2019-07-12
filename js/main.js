function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/api/users/signin/google',
        method: 'POST',
        data:{id_token},

    })
    .done(function(data){
        console.log('masuk ajax')
        localStorage.setItem('token', data)
    })
    .fail(function(err) {
        console.log(err)
    })
}