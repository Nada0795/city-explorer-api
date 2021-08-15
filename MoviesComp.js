'use strict'

const axios = require('axios');
const MoviesComp = {};

let ourMemory={};
MoviesComp.getMovieHandler = function(req,res){
  const city = req.query.city


  if (ourMemory[city]!==undefined){
    console.log('get the data from memory');
    res.send(ourMemory[city]);
  }

  else{
    console.log('get the data from API');

//https://api.themoviedb.org/3/movie/550?api_key=5da0fe89faab93fafb9d23776003ee8b&query=amman
const URLMovie = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${city}`

  }
   
  axios
    .get(URLMovie)
    .then(result => {
      // console.log('inside promise');
 
      let moviesArray = result.data.results
 
      res.send(MoviesComp.moviesForObject(moviesArray));
    })
    .catch(err => {
      res.send(err);
    })
  // console.log('outside promise');
}
 
MoviesComp.moviesForObject = (moviesObj) => {
 
  const forMoviesObj = [];
  moviesObj.map(element => {
 
    const title = element.title
    const overview = element.overview
    const vote_average = element.vote_average
    const vote_count = element.vote_count
    const poster_path = process.env.img_url+element.poster_path
    const popularity = element.popularity
    const release_date = element.release_date
 
 
    forMoviesObj.push(new Movies(title,overview,vote_average,vote_count,poster_path,popularity,release_date));
 
    // console.log(forMoviesObj);
  });
  return forMoviesObj;
}
 
}
class Movies { // movie class
  constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date) {
    this.title = title
    this.overview = overview
    this.vote_average = vote_average
    this.vote_count = vote_count
    this.poster_path = poster_path
    this.popularity = popularity
    this.release_date = release_date
  }
}
 


module.exports=MoviesComp;