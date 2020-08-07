const express = require('express');
const app = express();
const User = require('./models/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const localStrategy = require('passport-local');

const authRoutes = require('./routes/auth-routes');

app.use(bodyParser.json());

app.use((req, res , next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use(cookieSession({
  maxAge : 2592000000,
  keys : [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req,res) => {
  res.send("message: Connected sucessfully");
});

// app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

 mongoose.connect('mongodb://localhost/surveyApp')
   .then(() => {
     app.listen(PORT);
     console.log("Server Started");
   })
   .catch(err => {
     console.log(err);
   }); 

// app.listen(PORT, () => console.log("Server start"));
  