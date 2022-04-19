require ('dotenv').config({path: __dirname + '/./../.env'})
const express = require('express')
const db = require('./db')
const router = express()
const bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({extended: false}));

require('./Controllers/hotelController')(router);


let port = (process.env.API_PORT);

router.listen(port, ()=>{
  console.log('API rodando na porta: '+port);
})

