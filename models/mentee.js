let mongoose = require('mongoose');
let { Schema } = mongoose;

let menteeSchema = new Schema({
    name: {type:String, required:true},
    credentials: {type: Schema.Types.ObjectId, ref:'User'},
    forumPost: [{
        type: Schema.Types.ObjectId,
        ref: 'Forum'
    }],
    comments : [
		{
			type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
		}
	],
    Mentors: [{
        type: Schema.Types.ObjectId,
        ref: 'Mentor '
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }]
});

module.exports = mongoose.model("Mentee", menteeSchema);