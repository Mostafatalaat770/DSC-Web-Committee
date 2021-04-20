const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");
const port = 3000;

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
	const newUser = new User(req.body);
	await newUser.save();

	res.send("User created!");
});
app.get("/api/users/", async (req, res) => {
	const users = await User.find({});

	res.send(users);
});
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
