let mongoose = require('mongoose');
let { Schema } = mongoose;

let mentorSchema = new Schema({
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
	]
});

module.exports = mongoose.model("Mentor", mentorSchema);