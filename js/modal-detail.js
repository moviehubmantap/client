let movieSimiliar
let omdbMovie

function openDetail(movieId) {
  $('#movie-detail-container').empty()
  setPage('#movie-detail-container', '#movies-container')
  fetchOmdbById(movieId)
  .then(movie => {
    console.log('masuk omdb', movie)
    omdbMovie = movie
    return fetchSimiliar(movie.Title)
  })
  .then(result => {
    console.log('masuk similiar', result)
    $('#movie-detail-container').append(`
      <div id="movie-detail-header">
          <h1 id="movie-detail-title">${omdbMovie.Title}</h1>
          <h1  class="z-depth-2">${omdbMovie.imdbRating}</h1>
        </div>
      <div id="movie-detail">
        <img src="${omdbMovie.Poster}">
        <p>${omdbMovie.Director}</p>
        <p>${omdbMovie.Actors}</p>
        <p>${result.Similiar.Info.wTeaser}</p>
        <p>${result.Similiar.Info.wUrl}</p>
        <iframe class="video w100" width="540" height="260" src="${result.Similiar.Info.yUrl}" allowfullscreen framebprder="0"></iframe>
      </div> 
    `)
  })
  .fail(err => console.log(err))
  
}

