const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 8080;

var con = mysql.createConnection({
	host: "localhost",
	user: "***",
	password: "***",
	database: "Museo",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});
app.use(cors());
app.use(express.json());

app.listen(PORT);

app.get("/data", (req, res) => {
	con.query("SELECT * FROM story", (error, results) => {
		if (error) throw error;
		res.status(200).send({ results });
	});
});
app.post("/list/:name", (req, res) => {
	const { name } = req.params;

	con.query(
		"INSERT INTO list (`name`) VALUES ('" + name + "')",
		(error, results) => {
			if (error) throw error;
			res.status(200).send({ success: true });
		}
	);
});
app.get("/list", (req, res) => {
	con.query("SELECT * FROM list", (error, results, fields) => {
		if (error) throw error;
		res.status(200).send({ results });
	});
});
