let isLogin = localStorage.getItem('token') ? false : true
let loggedUser = ''
function setPage(show, hide) {
  $(show).show()
  $(hide).hide()
}

function changeDisplay(type, element) {
  if(Array.isArray(element)) {
    element.forEach(el => {
      if(type) {
        $(el).show()
      } else {
        $(el).hide()
      }
    });
  } else {
    if(type) {
      $(element).show()
    } else {
      $(element).hide()
    }
  }
}

$(document).ready(function() {
  if(isLogin) {
    M.toast({html: 'mantap sudah login gan !!!'})
    changeDisplay(true, ['#inside', '.login-true'])
    changeDisplay(false, ['#outside', '.login-false'])
    // let user = JSON.parse(localStorage.getItem('user'))
    // $('#username').html(user.username)
  } else {
    changeDisplay(true, ['#outside', '.login-false'])
    changeDisplay(false, ['#inside', '.login-true'])
  }

  changeDisplay(false, '#movie-detail-container')

  $('#login-form').submit(function(event) {
    event.preventDefault()
    let input = {
      email: $('#i-login-email').val(),
      password: $('#i-login-password').val()
    }
    loginRegister('login', input)
    .then(result => {
      M.toast({html: 'mantap sudah login gan !!!'})
      localStorage.setItem('token', result.token)
      loggedUser = result.payload
      localStorage.setItem('user', JSON.stringify(result.payload))
      isLogin = true
      changeDisplay(true, ['#inside', '.login-true'])
      changeDisplay(false, ['#outside', '.login-false'])
      $('#username').html(data.payload.name)
    })
    .catch(err => {console.log(err)})
  })

  $('#register-form').submit(function(event) {
    event.preventDefault()
    let input = {
      username: $('#i-register-username').val(),
      email: $('#i-register-email').val(),
      password: $('#i-register-password').val()
    }
    console.log(input, 'input register')
    loginRegister('register', input)
    .then(result => {
      console.log(result)
      M.toast({html: 'Successfully created an account !'})
    })
    .catch(err => {console.log(err)})
  })

  $('#nav-logout').click(function(event){ 
    event.preventDefault()
    localStorage.clear()
    M.toast({html: 'Signed Out'})
    changeDisplay(true, ['#outside', '.login-false'])
    changeDisplay(false, ['#inside', '.login-true'])
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  })

})


function onSignIn(googleUser) {
  googleSignIn(googleUser)
  .done(data => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.payload))
    loggedUser = data.user
    changeDisplay(true, ['#inside', '.login-true'])
    changeDisplay(false, ['#outside', '.login-false'])
    $('#username').html(data.payload.name)
  })
  .fail(err => {console.log(err.message)})
}