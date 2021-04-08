import mysql from "mysql";
import express from "express";
import cors from "cors";
const app = express();

// listener
app.listen(3001, function () {
  console.log("Node server running @ http://localhost:3001");
});

app.use(cors());

// connect mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "einvoicedb",
});

connection.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected!");
});

// mysql query
const getProducts = "select * from products";

// app get
app.get("/products", (req, res) => {
  connection.query(getProducts, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
