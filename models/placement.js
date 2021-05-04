let mongoose = require('mongoose');
let { Schema } = mongoose;

let placementSchema = new Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    domain: String,
    type:String,
    ctc: Number,
    location: String,
    date: String
});

module.exports = mongoose.model('Placement',placementSchema);