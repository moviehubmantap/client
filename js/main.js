$(document).ready(function() {
  $('#search-bar').submit(function(event) {
    event.preventDefault()
    let input = $('#search-input').val()
    console.log(input)
    searchOmdb(input)
    .done(result => {
      $('#title').addClass('animated fadeOutUp')
      changeDisplay(false, '#title')
      result.Search.forEach(movie => {
        $('#movies-container').append(`
          <div class="movie-item">
            <p>${movie.Title}</p>
            <p>Released on ${movie.Year}</p>
            <img src="${movie.Poster}"
          </div>
        `)
      });
    })
    .fail(err => {
      console.log(err)
    })
  })
})