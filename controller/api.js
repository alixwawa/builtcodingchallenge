const router = require("express").Router();
// const { update } = require("../models/transaction.js");
const Transaction = require("../models/transaction.js");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().trim().required(),
  value: Joi.number().min(1).max(10).required(),
  date: Joi.required()
});

//create
router.post("/api/transaction", ({body}, res) => {
  // console.log(Joi)


  const { error, value } = schema.validate(body)
  console.log(error)
  console.log(value)

  // schema.validate(body, (err, result) => {
  //   console.log("hellooo")
  //   if (err) {
  //     console.log("err")
  //     // console.log(err);
  //     // res.send('an error has occured');
  //   } else {
  //     console.log("result")
  //     // console.log(result);
  //     // res.send('successfully posted data')
  //   }
  // })

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
// console.log(body)

const { error, value } = schema.validate(body)
console.log(error)
console.log(value)

// schema.validate(body, (err, result) => {
//   console.log("hellooo")
//   if (err) {
//     console.log("err")
//     // console.log(err);
//     // res.send('an error has occured');
//   } else {
//     console.log("result")
//     // console.log(result);
//     // res.send('successfully posted data')
//   }
//   })
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

router.get("/test", async (req, res) => {
  res.json({ message: "pass!" });
});

module.exports = router;