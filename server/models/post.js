const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	content: String,
	date: { type: Date, default: Date.now() },
	likes: { type: "number", default: 0 },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongoose.model("Post", schema);
