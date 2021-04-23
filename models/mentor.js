let mongoose = require('mongoose');
let { Schema } = mongoose;

let mentorSchema = new Schema({
    name: {type:String, required:true},
    age: {type:Number, required:true},
    email: String,
    domain:  {type:String},
    experience: Number,
    linkedin: String,
    bio:String,
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
    }],
    mentees: [{
        type: Schema.Types.ObjectId,
        ref: 'Mentee'
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }]
});

module.exports = mongoose.model("Mentor", mentorSchema);