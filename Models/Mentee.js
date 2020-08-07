var mongoose = require('mongoose');

var MenteeSchema = new mongoose.Schema({
name: {type:String,required:ture},
credentials:{type:Schema.Types.ObjectId,ref:"Credentials"}
});

Var Mentee=mongoose.model('Mentee',MenteeSchema);

module.exports = Mentee;
