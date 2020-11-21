const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("./Routes/Route");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(
	process.env.DB_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("connected to database");
	}
);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(express.json());

app.use("/", route);

app.listen(4000, () => {
	"app started";
});
