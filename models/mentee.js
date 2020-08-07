let mongoose = require('mongoose');
let { Schema } = mongoose;

let menteeSchema = new Schema({
    name: {type:String, required:true},
    credentials: {type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model("Mentee", menteeSchema);