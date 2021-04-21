const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	content: String,
	date: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Comment", schema);
