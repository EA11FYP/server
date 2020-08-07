let mongoose = require('mongoose');

let mentorSchema = new mongoose.Schema({
    name: {type:String, required:true},
    credentials: {type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model("Mentor", mentorSchema);