$(document).ready(function() {
  $('#search-bar').submit(function(event) {
    event.preventDefault()
    $('#movies-container').empty()
    let input = $('#search-input').val()
    console.log(input)
    searchOmdb(input)
    .done(result => {
      $('#title').addClass('animated fadeOutUp')
      changeDisplay(false, '#title')
      result.Search.forEach(movie => {
        $('#movies-container').append(`
          <div class="movie-item z-depth-3">
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