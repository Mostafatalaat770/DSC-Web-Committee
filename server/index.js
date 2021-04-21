const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");
const port = 3000;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connected!"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.post("/api/users/", async (req, res) => {
	const userPassword = await bcrypt.hash(req.body.password, saltRounds);
	const newUser = new User({ ...req.body, password: userPassword });
	await newUser.save();

	res.send("User created!");
});
app.get("/api/users/", async (req, res) => {
	const users = await User.find({});

	res.send(users);
});
app.get("/api/users/:id", async (req, res) => {
	const userId = req.params.id;
	const user = await User.findById(
		userId,
		"fName lName _id posts bio username"
	).populate("posts");

	res.send(user);
});
app.post("/api/posts/", async (req, res) => {
	const newPost = new Post(req.body);
	await newPost.save();

	res.send("Post created!");
});
app.get("/api/posts/", async (req, res) => {
	const posts = await Post.find({}).populate("author", "fName lName _id");

	res.send(posts);
});
app.get("/api/posts/:id", async (req, res) => {
	const postId = req.params.id;
	const post = await Post.findById(postId)
		.populate("author", "fName lName _id")
		.populate("comments");

	res.send(post);
});
app.post("/api/comments/", async (req, res) => {
	const newComment = new Comment(req.body);
	await newComment.save();

	res.send("Comment created!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
