const router = require("express").Router();
const Transaction = require("../models/transaction.js");

//create
router.post("/api/transaction", ({body}, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

//create
router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

//read
router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// Delete route
router.delete("/api/deletetransaction", (req, res) => {
  // console.log("delete")
  // console.log(req.body)
  Transaction.deleteOne(req.body)
    .then(dbTransaction => {
      
      console.log("done")
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;