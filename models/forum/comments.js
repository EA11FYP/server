let mongoose  = require("mongoose");
let { Schema } = mongoose;

let commentSchema = Schema({
	body: String,
	author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    date: Date
});

module.exports=mongoose.model("Comment", commentSchema);