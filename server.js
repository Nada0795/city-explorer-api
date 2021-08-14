'use strict';

require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
// const data =require('./data/wether.json');
const axios = require('axios');
const PORT = process.env.PORT;
server.use(cors());



// result ? res.send(result) : res.status(500).send ('anything')
// })

const Weather = require('./Weather');
const MoviesComp = require('./MoviesComp');



    server.get('/', (req,res)=> {
      res.send('Hi from root route');
    

      server.get('/getWeather', Weather.getWeatherHandler);


      server.get('/movies', MoviesComp.getMovieHandler);

//any route
server.get('*', (req,res)=> {
  res.status(404).send('page not found');
})

//listen
server.listen(PORT, () => {
  console.log(`im listening on PORT = ${PORT}`);
});
