const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
//importing routes:
const authRoutes = require('./routes/authRoutes');
//importing middleware:
const { requireAuth, checkUser } = require('./middleware/authMiddeware');

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
app.get('*',checkUser);
app.get('/',(req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


