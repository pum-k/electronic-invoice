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

app.post("/search-product-exactly", (req, res) => {
  let keySearch = req.body.keySearch;
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
  connection.query("select * from customers", (err, results) => {
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

app.post("/search-customer-exactly", (req, res) => {
  let keySearch = req.body.keySearch;
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

app.post("/update-customer", (req, res) => {
  connection.query(
    "call pr_updateCustomer(?,?,?,?,?,?,?)",
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

app.post("/delete-customer", (req, res) => {
  connection.query(
    "call pr_deleteCustomer(?)",
    [req.body.idCustomer],
    (err) => {
      if (err) res.send(err);
      else res.send({ status: true });
    }
  );
});


app.get("/invoices", (req, res) => {
  connection.query("select * from invoices", (err, results) => {
    if(err) res.send(err)
    else res.send(results);
  })
})

app.post("/save-invoice", (req, res) => {
  connection.query("call pr_addInvoice(?,?,?,?)", [
    req.body.idInvoice,
    req.body.idCustomer,
    req.body.CreatedAt,
    req.body.TotalPayment,
  ], err => {
    if (err) res.send(err)
    else res.send({status: true});
  });
});

app.post("/order", (req, res) => {
  connection.query("call pr_addOrder(?,?,?)", [req.body.idInvoice, req.body.idProduct, req.body.Quantity], err => {
    if (err) res.send(err)
    else res.send({status: true});
  })
})

app.post("/search-invoice", (req, res) => {
  let keySearch = "%" + req.body.keySearch + "%";
  connection.query("call pr_searchInvoice(?)", [keySearch], (err, results) => {
    if (err) res.send(err);
    else res.send(results);
  });
});

app.post("/getCustomer", (req, res) => {
  connection.query("select * from customers where idCustomer = ?",[req.body.idCustomer], (err, results) => {
    if (err) res.send(err)
    else res.send(results);
  })
})
app.post("/getDetailBill", (req, res) => {
  connection.query("select * from orders where idInvoice = ?",[req.body.idInvoice], (err, results) => {
    if (err) res.send(err)
    else res.send(results);
  })
})

app.post("/getProduct", (req, res) => {
  connection.query("select * from products where idProduct = ?",[req.body.idProduct], (err, results) => {
    if (err) res.send(err)
    else res.send(results);
  })
})

app.post("/getInvoice", (req, res) => {
  connection.query("select * from invoices where idInvoice = ?",[req.body.idInvoice], (err, results) => {
    if (err) res.send(err)
    else res.send(results);
  })
})

app.post("/delete-invoice", (req, res) => {
  connection.query("call pr_deleteInvoice(?)", [req.body.idInvoice], (err, results) => {
    if (err) res.send(err)
    else res.send({status: true});
  })
})

app.post("/update-CP", (req, res) => {
  console.log(req.body.IdCustomer ,req.body.CP);
  connection.query("call pr_updateCP(?,?)", [req.body.idCustomer ,req.body.CP], (err, results) => {
    if (err) res.send(err)
    else res.send({status: true});
  })
})