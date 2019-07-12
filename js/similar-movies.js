function setSimilar(movie) {
  let similar = movie.Similar.Results
  console.log(similar)
  similar.forEach(sim => {
    $('#similar-list').append(`
      <p class="similar-item z-depth-2" id="${sim.Name}">${sim.Name}</p>
    `)
  });
}