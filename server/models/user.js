const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	fName: "string",
	lName: "string",
	email: "string",
	username: "string",
	password: "string",
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	bio: "string",
});
export const User = mongoose.model("User", schema);
