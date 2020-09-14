let mongoose = require('mongoose');
let { Schema } = mongoose;

let forumSchema = new Schema({
    title: String,
    description: String,
    upvotes: {type:Number, default: 0},
    downvotes: {type:Number, default: 0},
    date: Date,
    domain: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Forun", forumSchema);