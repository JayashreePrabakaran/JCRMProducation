const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const path = require('path');
// const fs = require('fs');
// const morgan = require('morgan')
require('dotenv').config();
require('./configurations/mongoDB')();

const app = express();
const PORT = 3005;

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
// app.use(morgan('combined', { stream: accessLogStream }))

app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(cors());


app.use('/auth', require('./routes/auth'));
app.use('/v1', require('./routes/user'));

app.listen(PORT, ()=> {console.log(`Server Running In ${PORT}`)});
