const omdbAPI = 'http://www.omdbapi.com/?page=1&apikey=bda36ca2&s='

function searchOmdb(input) {
  return $.ajax({
    method: 'GET',
    url: `${omdbAPI}${input}`
  })
}