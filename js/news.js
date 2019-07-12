function getNews(value){
  fetchNews(value)
  .then(resp => {
    $('#relatedNews').append(`
      <div class="row">
        <div class="col s3">
          <div class="thumbnail">
              <img src="${resp.data1.urlToImage}" alt = "Generic placeholder thumbnail">
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
        <div class="col s3">
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
        <div class="col s3">
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
        <div class="col s3">
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
      readNews(value)
  })  
  .catch(err => {
      console.log(err);
      
  })
}

function readNews(value){
  $('.readNews').click(function(event){
    event.preventDefault()
    let title = this.id
    $.ajax({
      method : 'GET',
      url : `http://localhost:3000/api/news/detail/${title}?q=${value}`,
    })
    .then(resp => {
        $('#detailNews').empty()
        $('#detailNews').append(`
          <div class="row" id="news-detail">
            <div class="col s12">
              <div class="card">
                <div class="card-image">
                  <img src="${resp.urlToImage}">
                  <span class="card-title">${resp.title}</span>
                </div>
                <div class="card-content">
                  <p>${resp.description} ${resp.content}</p>
                </div>
                <small>${new Date(resp.publishedAt).toDateString()}</small>
              </div>
            </div>
          </div>
        `)
    })
    .catch(err =>{
        console.log(err);
        
    })
  })
}