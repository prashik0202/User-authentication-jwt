const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
//importing routes:
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGO_URI; 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    console.log("DATABASE IS CONNECTED!")
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log("ERROR IN CONNECTED TO DATABASE!");
    console.log(err)
  });

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.get('/set-cookie', (req,res) => {
  res.cookie('employee',true,{ maxAge : 1000 * 60 * 60 * 24 , secure : true});
  res.send('you got the cookie!');
});

app.get('/read-cookies',(req,res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
})

app.use(authRoutes);


