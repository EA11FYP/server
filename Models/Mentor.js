var mongoose = require('mongoose');

var MentorSchema = new mongoose.Schema({
name: {type:String,required:ture},
credentials:{type:Schema.Types.ObjectId,ref:"Credentials"}
});

Var Mentor=mongoose.model('Mentor',MentorSchema);

module.exports =Mentor;
