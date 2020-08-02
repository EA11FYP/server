const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

app.use(bodyParser.json());

app.use((req, res , next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.get("/", (req,res) => {
  res.send("message: Connected sucessfully");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);
// mongoose.connect(keys.mongoURI)
//   .then(() => {
//     app.listen(PORT);
//     console.log("Server Started");
//   })
//   .catch(err => {
//     console.log(err);
//   });