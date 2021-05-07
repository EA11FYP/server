let mongoose = require('mongoose');
let { Schema } = mongoose;

let menteeSchema = new Schema({
    name: {type:String, required:true},
    location: String,
    website: String,
    ceo: String,
    email: String,
    phone: Number,
    founders: String,
    linkedin: String,
    domain: String,
    funding: Number,
    bio: String,
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
    mentors: [{
        type: Schema.Types.ObjectId,
        ref: 'Mentor '
    }],
    jobOpenings:[{
        type: Schema.Types.ObjectId,
        ref: 'Placement'
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }]
});

module.exports = mongoose.model("Mentee", menteeSchema);