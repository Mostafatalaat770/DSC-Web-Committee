const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	content: "string",
	likes: "number",
	comments: [{ type: "string" }],
});
module.exports = mongoose.model("Post", schema);
