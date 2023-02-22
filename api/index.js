const app = require("express")();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 8080;

var con = mysql.createConnection({
	host: "localhost",
	user: "PHPmikeAdmin",
	password: "2468135790",
	database: "Museo",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});
app.use(cors());

app.listen(PORT);

app.get("/data", (req, res) => {
	con.query("SELECT * FROM story", (error, results, fields) => {
		if (error) throw error;
		res.status(200).send({ results });
	});
});
