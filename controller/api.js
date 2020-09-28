const router = require("express").Router();
const { update } = require("../models/transaction.js");
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
      // res.json(dbTransaction);
      // console.log(dbTransaction)
      console.log(res.json(dbTransaction))
      console.log("done")
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// Delete route
router.put("/api/updatetransaction/:id", (req, res) => {
  console.log("update")
  console.log(req.params);
  console.log(req.body);
  const id = req.params.id
  if (req.body.name && !req.body.value) {
    console.log("just name")
    Transaction.findByIdAndUpdate({_id: id}, {$set: req.body})
    .then(dbTransaction => {
      res.json(dbTransaction);
      console.log(dbTransaction)
    })
    .catch(err => {
      res.status(400).json(err);
    });
  } else if (!req.body.name && req.body.value ) {
    console.log("just value")
    Transaction.findByIdAndUpdate({_id: id}, {$set: req.body})
    .then(dbTransaction => {
      res.json(dbTransaction);
      console.log(dbTransaction)
    })
    .catch(err => {
      res.status(400).json(err);
    });
  } else if (req.body.name && req.body.value) {
    console.log("name and value")
    Transaction.findByIdAndUpdate({_id: id}, {$set: req.body})
    .then(dbTransaction => {
      res.json(dbTransaction);
      console.log(dbTransaction)
    })
    .catch(err => {
      res.status(400).json(err);
    });
  } else {
    console.log("something went wrong")
  }
});

module.exports = router;