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


let baseUrl = 'http://localhost:3000'

function fetchNews(){
    let value = $('#inputMovie').val()
    console.log(value);
    $.ajax({
        method : 'GET',
        url : `${baseUrl}/api/news?q=${value}`,
        
    })
    .then(resp => {
        console.log(resp);
            $('#relatedNews').append(
                `
                <div id="youtube" style="margin-left:40px">
                <div class="row">
                <div class="col-md-3">
                    <div class = "thumbnail">
                        <img src = "${resp.data1.urlToImage}" alt = "Generic placeholder thumbnail">
                    </div>
                    <div class = "caption">
                        <h6>${resp.data1.title}</h6>  
                        <p>
                            <a href = "#" class = "btn btn-primary readNews" role = "button" id="${resp.data1.title}">
                                read more
                            </a> 
                        </p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class = "thumbnail">
                        <img src = "${resp.data2.urlToImage}" alt = "Generic placeholder thumbnail">
                    </div>
                    <div class = "caption">
                        <h6>${resp.data2.title}</h6>  
                        <p>
                            <a href = "#" class = "btn btn-primary readNews" role = "button" id="${resp.data2.title}">
                                read more
                            </a> 
                        </p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class = "thumbnail">
                        <img src = "${resp.data3.urlToImage}" alt = "Generic placeholder thumbnail">
                    </div>
                    <div class = "caption">
                        <h6>${resp.data3.title}</h6>  
                        <p>
                            <a href = "#" class = "btn btn-primary readNews" role = "button" id="${resp.data3.title}">
                                read more
                            </a> 
                        </p>
                    </div>
                </div>
                <div class="col-md-3">
                <div class = "thumbnail">
                    <img src = "${resp.data4.urlToImage}" alt = "Generic placeholder thumbnail">
                </div>
                <div class = "caption">
                    <h6>${resp.data4.title}</h6>  
                    <p>
                        <a href = "#" class = "btn btn-primary readNews" role = "button" id="${resp.data4.title}">
                            read more
                        </a> 
                    </p>
                </div>
            </div>
              </div>`
            )
            
        youtube(value + ' Trailer')
        readNews(value)
       

    })  
    .catch(err => {
        console.log(err);
        
    })
}

function readNews(value){
    $('.readNews').click(function(){
        $.ajax({
            method : 'GET',
            url : `${baseUrl}/api/news/detail/${this.id}?q=${value}`,
        })
        .then(resp => {
            console.log(resp);
            $('#relatedNews').empty()
            $('#detailnews').append(`<div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
            <div class="card mb-3">
            <img class="card-img-top" src="${resp.urlToImage}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${resp.title}</h5>
              <p class="card-text">${resp.description}${resp.content}</p>
              <small class="text-muted">by ${resp.author}</small>
              <p class="card-text"><small class="text-muted">${new Date(resp.publishedAt).toDateString()}</small>
              </p>
            </div>
            </div>

            </div>
            <div class="col-md-2"></div>
          </div>`)
        })
        .catch(err =>{
            console.log(err);
            
        })

    })
}

function youtube(title){
    $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/youtube/v3/search?part=id&q=${title} trailer&type=video&key=AIzaSyAgufyMDC_DB_DJufzI1ueBKtkMYTH_9C0`,
        // headers:{
        //     token : localStorage.getItem('token')
        // }
    })
    .done(resp => {
        console.log(resp.items[0].id.videoId)
        $('#youtube').append(`
            <iframe class="video w100" width="540" height="260" src="//www.youtube.com/embed/${resp.items[0].id.videoId}" frameborder="0" allowfullscreen></iframe>
        `)
    })
    .fail((jqXHR, textStatus) => {
        console.log(textStatus)
    })
}

$(document).ready(function(){ 
    $('#Gofind').click(function(){
        $('#detailnews').empty()
        fetchNews()
    })
})
