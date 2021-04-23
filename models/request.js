let mongoose = require('mongoose');
let { Schema } = mongoose;

let requestSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Mentee'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor'
    },
    status: String,
    mentorName: String,
    menteeName: String,
    date: String
});

module.exports = mongoose.model("Request", requestSchema);