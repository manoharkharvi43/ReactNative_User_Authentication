const { Router } = require("express");
const route = Router();
const users = require("../Scheme/Scheme");
const {
	registervalidation,
	loginvalidation,
} = require("../Validation/Validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//siginUsers

route.post("/signin", async (req, res) => {
	//validating username ,password , email
	const validation = registervalidation(req.body);
	if (validation.error) {
		return res.status(400).send(validation.error.details[0].message);
	}

	//checking if email already exists
	const emailexist = await users.findOne({ email: req.body.email });

	if (emailexist) return res.status(400).send("email already exists");

	//creating a hash of password
	const salt = await bcrypt.genSaltSync(10);
	const hashedpassword = await bcrypt.hashSync(req.body.password, salt);

	//creating new user
	const Data = new users({
		username: req.body.username,
		email: req.body.email,
		password: hashedpassword,
	});
	try {
		const user_details = await Data.save();
		const user_token = jwt.sign({ _id: user_details._id }, process.env.SECRET_KEY);
		res.header("auth-token", user_token).send(user_token);
	} catch (err) {
		res.send({ message: err });
		res.body.send(err);
	}
});

//loginUsers

route.post("/login", async (req, res) => {
	const { error } = loginvalidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if email exists before login
	const user = await users.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Email or Password is incorrect");

	//checking if password exists before login
	const passwordExists = await bcrypt.compareSync(
		req.body.password,
		user.password
	);
	if (!passwordExists)
		return res.status(400).send("Email or Password is incorrect");

	const user_token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
	res.header("auth-token", user_token).send(user_token);
});
module.exports = route;
