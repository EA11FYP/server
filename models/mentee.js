let mongoose = require('mongoose');

let menteeSchema = new mongoose.Schema({
    name: {type:String, required:true},
    credentials: {type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model("Mentee", menteeSchema);