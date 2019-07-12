const omdbAPI = 'http://www.omdbapi.com/?page=1&apikey=bda36ca2&type=movie&s='
const omdbAPIbyId = 'http://www.omdbapi.com/?apikey=bda36ca2&type=movie&i='
const omdbAPIbyTitle = 'http://www.omdbapi.com/?apikey=bda36ca2&type=movie&t='
const url = 'http://localhost:3000/'

function searchOmdb(input) {
  return $.ajax({
    method: 'GET',
    url: `${omdbAPI}${input}`
  })
}


function loginRegister(type, input) {
  return $.ajax({
    method: 'POST',
    url: `${url}api/users/${type}`,
    data: input
  })
}


function fetchNews(input) {
  return $.ajax({
    method : 'GET',
    url : `${url}api/news?q=${input}`,
  })
}

function fetchSimiliar(input) {
  return $.ajax({
    method: 'GET',
    url: `${url}api/similar/${input}`
  })
}

function fetchOmdbById(id) {
  return $.ajax({
    method: 'GET',
    url: `${omdbAPIbyId}${id}`
  })
}

function fetchOmdbByTitle(title) {
  return $.ajax({
    method: 'GET',
    url: `${omdbAPIbyTitle}${title}`
  })
}

function googleSignIn(googleUser) {
  const { id_token } = googleUser.getAuthResponse()
  return $.ajax({
    method: 'POST',
    url: `${url}api/users/signin/google`,
    data: {
      id_token
    }
  })
}