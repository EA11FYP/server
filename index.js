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
const forumRoutes = require('./routes/forum-routes');
const blogRoutes = require('./routes/blog-routes');
const mentorRoutes = require('./routes/mentor-routes');
const requestRoutes = require('./routes/request-routes');

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

app.use("/api/auth", authRoutes);

app.use("/api/forum", forumRoutes);

app.use("/api/blog", blogRoutes);

app.use("/api/mentor", mentorRoutes);

app.use("/api/request", requestRoutes);

app.all('*',(req,res) => {
  return res.status(404).send({
    success: false,
    message:" route not found"
  })
});

const PORT = process.env.PORT || 5000;


 mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false})
    .then(() => {
      app.listen(PORT);
      console.log("Server Started");
      console.log("Connected to DB");
    })
    .catch(err => {
      console.log(err);
   }); 

//app.listen(PORT);

  