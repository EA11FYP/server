var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
name: {type:String,required:ture},
credentials:{type:Schema.Types.ObjectId,ref:"Credentials"}
});

Var User=mongoose.model('User',UserSchema);

module.exports = User;
