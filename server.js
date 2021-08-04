'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require("express");
const server = express();
const data =require('./data/wether.json');

const PORT = process.env.PORT;

// const PORT = 3001

// const lat = process.data.lat;
// const lon = process.data.lon;
// const searchQuery = process.data.city_name;




server.use(cors());


server.listen(PORT, () => {
  console.log(`im listening on PORT = ${PORT}`);
});
