const omdbAPI = 'http://www.omdbapi.com/?page=1&apikey=bda36ca2&type=movie&s='
const omdbAPIbyId = 'http://www.omdbapi.com/?apikey=bda36ca2&type=movie&i='
const url = 'http://localhost:3000/'
const tasteDiveAPI = 'https://tastedive.com/api/similar?type=movies&k=340179-movieHub-6N3RBPCP&limit=10&info=1&q='

function searchOmdb(input) {
  return $.ajax({
    method: 'GET',
    url: `${omdbAPI}${input}`
  })
}

function loginRegister(type, input) {
  return $.ajax({
    method: 'POST',
    url: `${url}users/${type}`,
    data: input
  })
}


function fetchNews(input) {
  return $.ajax({

  })
}

function fetchSimiliar(input) {
  return $.ajax({
    method: 'GET',
    url: `${tasteDiveAPI}${input}`
  })
}

function fetchOmdbById(id) {
  return $.ajax({
    method: 'GET',
    url: `${omdbAPIbyId}${id}`
  })
}
