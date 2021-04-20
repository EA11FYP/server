let mongoose = require('mongoose');
let { Schema } = mongoose;

let mentorSchema = new Schema({
    name: {type:String, required:true},
    credentials: {type: Schema.Types.ObjectId, ref:'User'}, //user.js
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
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

module.exports = mongoose.model("Mentor", mentorSchema);