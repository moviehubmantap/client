let isLogin = true

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
    changeDisplay(true, ['#inside', '.login-true'])
    changeDisplay(false, ['#outside', '.login-false'])
  } else {
    changeDisplay(true, ['#outside', '.login-false'])
    changeDisplay(false, ['#inside', '.login-true'])
  }

  changeDisplay(false, '#movie-detail-container')
})