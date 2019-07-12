$('#search-bar').submit(function(event) {
  event.preventDefault()
  $('#movies-container').empty()
  let input = $('#search-input').val()
  searchOmdb(input)
  .done(result => {
    $('#title').addClass('animated fadeOutUp')
    changeDisplay(true, ['#movies-container'])
    changeDisplay(false, ['#title', '#movie-detail-container'])
    result.Search.forEach(movie => {
      $('#movies-container').append(`
        <div class="movie-item z-depth-3">
          <p class="movie-title">${movie.Title}</p>
          <p>Released on ${movie.Year}</p>
          <img src="${movie.Poster}">
          <a class="waves-effect waves-light btn modal-trigger detail-btn" href="#" id="${movie.imdbID}">Detail</a>
        </div>
      `)
    });
    $('.detail-btn').click(function(event) {
      event.preventDefault()
      let movieId = this.id
      openDetail(movieId)
    })
  })
  .fail(err => {
    console.log(err)
  })
})






