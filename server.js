console.log("LTW server Intialized.");

/* Require Dot env because we need which port would be intialize*/
require("dotenv").config();


/*Initializing express*/
const express = require('express');
const app = express();

/* Intializing Cors */
const cors = require('cors');
app.use(cors({'allowedHeaders': ['sessionId', 'Content-Type', 'authorization'],
'exposedHeaders': ['sessionId'],
'origin': '*',
'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
'preflightContinue': false,
'Access-Control-Allow-Headers': 'Content-Type',
'Access-Control-Allow-Methods': 'GET, POST',
'Access-Control-Allow-Origin': '*'}));

/* body-parser */
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());


app.listen(7399);

console.log("API SERVER PORT IS RUNNING ON :" + 7399);


const login = require('./app/routes/login.route')(app);

