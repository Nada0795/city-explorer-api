'use strict';

require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
const data =require('./data/wether.json');

const PORT = process.env.PORT;
server.use(cors());

class Forecast {
constructor(date,description){
  this.date=date;
  this.description=description;

}


}
// const PORT = 3001

// const lat = process.data.lat;
// const lon = process.data.lon;
// const searchQuery = process.data.city_name;

// "description": "Low of 17.1, high of 23.6 with broken clouds",
// "date": "2021-03-31"

//http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
server.get('/weather',(req,res)=>{
const lat = Number (req.query.lat);
const lon = Number (req.query.lon);
const cityName=req.query.searchQuery.toLowerCase();

console.log(lat,lon,cityName);
const result = []
data.find(item=>{
  if (item.city_name.toLowerCase()==cityName){
item.data.forEach(day => {

  const desc=`Low of ${day.low_temp}, high of ${day.high_temp},with ${day.weather.description}`
console.log(day)
result.push( new Forecast (day.datetime,desc))
  
});


  }
} )

result ? res.send(result) : res.status(500).send ('anything')
})




server.listen(PORT, () => {
  console.log(`im listening on PORT = ${PORT}`);
});
