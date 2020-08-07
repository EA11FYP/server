var mongoose = require('mongoose');

var CredentialsSchema = new mongoose.Schema({
username: {type:String,required:ture},
 password: {type:String,required:ture}
});

Var Credentials=mongoose.model('Credentials',CredentialsSchema);

module.exports = Credentials;