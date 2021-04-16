import mysql from "mysql";
import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
const app = express();

// listener
app.listen(3001, function () {
  console.log("Node server running @ http://localhost:3001");
});

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// connect mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "einvoicedb",
});

connection.connect((error) => {
  if (error) console.log(error);
  else console.log("Mysql Connected!");
});

// app get
app.get("/products", (req, res) => {
  connection.query("select * from products", (err, results) => {
    if (err) res.send(err);
    else res.send(results);
  });
});

//app post
//product
app.post("/add-product", (req, res) => {
  connection.query(
    "call pr_addProduct(?,?,?,?)",
    [req.body.idProduct, req.body.Name, req.body.Unit, req.body.UnitPrice],
    (err) => {
      if (err) res.send(err);
      else res.send({ status: true });
    }
  );
});

app.post("/search-product", (req, res) => {
  let keySearch = "%" + req.body.keySearch + "%";
  connection.query("call pr_searchProduct(?)", [keySearch], (err, results) => {
    if (err) res.send(err);
    else res.send(results);
  });
});

app.post("/delete-product", (req, res) => {
  connection.query("call pr_deleteProduct(?)", [req.body.idProduct], (err) => {
    if (err) res.send(err);
    else res.send({ status: true });
  });
});

app.post("/update-product", (req, res) => {
  connection.query(
    "call pr_updateProduct(?,?,?)",
    [req.body.idProduct, req.body.Unit, req.body.UnitPrice],
    (err) => {
      if (err) res.send(err);
      else {
        res.send({ status: true });
        console.log("oke");
      }
    }
  );
});

// STORE INFORMATION

app.get("/store", (req, res) => {
  connection.query("select * from store", (err, results) => {
    if (err) res.send(err);
    else res.send(results);
  });
});

app.post("/update-store", (req, res) => {
  console.log(req.body);
  connection.query(
    "call pr_updateStore(?,?,?,?)",
    [req.body.Name, req.body.Address, req.body.Email, req.body.Phone],
    (err) => {
      if (err) res.send(err);
      else res.send({ status: true });
    }
  );
});

// CUSTOMERS
app.get("/customers", (req, res) => {
  connection.query("select * from customers limit 5", (err, results) => {
    if (err) res.send(err);
    else res.send(results);
  });
});

app.post("/search-customer", (req, res) => {
  let keySearch = "%" + req.body.keySearch + "%";
  connection.query("call pr_searchCustomer(?)", [keySearch], (err, results) => {
    if (err) res.send(err);
    else res.send(results);
  });
});

app.post("/add-customer", (req, res) => {
  connection.query(
    "call pr_addCustomer(?,?,?,?,?,?,?)",
    [
      req.body.idCustomer,
      req.body.FullName,
      req.body.Phone,
      req.body.Email,
      req.body.DateOfBirth,
      req.body.Address,
      req.body.CP,
    ],
    (err) => {
      if (err) res.send(err);
      else res.send({ status: true });
    }
  );
});
