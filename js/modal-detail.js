let movieSimiliar
let omdbMovie
let omdbSimilar

function appendDetail(result) {
  $('#movie-detail-container').append(`
    <div id="movie-detail-header">
      <h1 id="movie-detail-title">${omdbMovie.Title}</h1>
      <h1 id="movie-detail-score" class="z-depth-2">${omdbMovie.imdbRating}</h1>
    </div>
    <div id="movie-detail">
      <img src="${omdbMovie.Poster}">
      <div id="movie-detail-content">
        <p id="movie-detail-director">Directed by : ${omdbMovie.Director}</p>
        <p id="movie-detail-actors">Cast: ${omdbMovie.Actors}</p>
        <p id="movie-detail-description">${result.Similar.Info[0].wTeaser}</p>
        <a id="movie-detail-wiki" href="${result.Similar.Info[0].wUrl}" target="_blank" class="btn">More</a>
      </div>
    </div>
    <p id="trailer-text">Trailer</p>
    <div id="movie-detail-vid">
      <iframe class="video w100" width="540" height="360" src="${result.Similar.Info[0].yUrl}" allowfullscreen framebprder="0"></iframe>
    </div>
    <p id="similar-text">Similar Movies :</p>
      <div id="similar-list"></div>
    </div>
    <p id="news-text">Related News : </p>
    <div id="relatedNews"></div>
    <div id="detailNews"></div>
  `)
  getNews(omdbMovie.Title)
}

function clickSimilar() {
  $('.similar-item').click(function(event) {
    $('#movie-detail-container').empty()
    event.preventDefault()
    let movieTitle = this.id
    fetchOmdbByTitle(movieTitle)
    .then(detail => {
      omdbMovie = detail
      return fetchSimiliar(detail.Title)
    })
    .then(result => {
      appendDetail(result)
      if(omdbMovie.imdbRating > 7) {
        $('#movie-detail-score').addClass('good-score')
      } else {
        $('#movie-detail-score').addClass('bad-score')
      }
      setSimilar(result)
      clickSimilar()
    })
    .catch(err => {
      console.log(err)
    })
  })
}

function openDetail(movieId) {
  $('#movie-detail-container').empty()
  setPage('#movie-detail-container', '#movies-container')
  fetchOmdbById(movieId)
  .then(movie => {
    omdbMovie = movie
    return fetchSimiliar(movie.Title)
  })
  .then(result => {
    appendDetail(result)
    if(omdbMovie.imdbRating > 7) {
      $('#movie-detail-score').addClass('good-score')
    } else {
      $('#movie-detail-score').addClass('bad-score')

    }
    setSimilar(result)
    clickSimilar()
  })
  .fail(err => console.log(err))
  
}

