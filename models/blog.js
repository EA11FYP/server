let mongoose = require('mongoose');
let { Schema } = mongoose;

let blogSchema = new Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    domain:String,
    date: String
});

module.exports = mongoose.model('Blog',blogSchema);