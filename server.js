'use strict';

require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
// const data =require('./data/wether.json');
const axios = require('axios');
const PORT = process.env.PORT;
server.use(cors());

const Weather=require('./Weather');
const MoviesComp=require('./MoviesComp');

class Forecast {
constructor(date,description){
  this.date=date;
  this.description=description;

}

server.get('/',(req,res) =>{ 
  res.send('hi from the root route'); 
  })

  server.get('/getWeather', Weather.getWeatherHandler);

  server.get('/movies', MoviesComp.getMovieHandler);



}

axios
.get(URL)
.then(result => {
    // console.log('inside promise');
    let weatherArray = result.data
    res.send(weatherForObject(weatherArray));
})
.catch(err => {
    res.send(err);
})
// console.log('outside promise');
}

const PORT = 3001

const lat = process.data.lat;
const lon = process.data.lon;
const searchQuery = process.data.city_name;

"description": "Low of 17.1, high of 23.6 with broken clouds",
// "date": "2021-03-31"

//http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
server.get('/weather',(req,res)=>{
const lat = Number (req.query.lat);
const lon = Number (req.query.lon);
const cityName=req.query.searchQuery.toLowerCase();

// console.log(lat,lon,cityName);
const result = []
data.find(item=>{
  if (item.city_name.toLowerCase()==cityName){
item.data.forEach(day => {

  const desc=`Low of ${day.low_temp}, high of ${day.high_temp},with ${day.weather.description}`
// console.log(day)
result.push( new Forecast (day.datetime,desc))
  
});


  }
} )

result ? res.send(result) : res.status(500).send ('anything')
})

//http:localhost:3001/movies?city=Amman
server.get('/movies', getMovieHandler);

function getMovieHandler(req, res) {
    const city = req.query.city


 //https://api.themoviedb.org/3/movie/550?api_key=5da0fe89faab93fafb9d23776003ee8b&query=amman
    const URLMovie = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${city}`



   
    axios
    .get(URLMovie)
    .then(result => {
        // console.log('inside promise');

        let moviesArray = result.data.results

        res.send(moviesForObject(moviesArray));
    })
    .catch(err => {
        res.send(err);
    })
// console.log('outside promise');
}

const moviesForObject = (moviesObj) => {

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


class Movies { 
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

//any route
server.get('*', (req,res)=> {
  res.status(404).send('page not found');
})






//listen
server.listen(PORT, () => {
  console.log(`im listening on PORT = ${PORT}`);
});
