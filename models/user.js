let mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

let userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	userType: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);