const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const Transaction = require("../models/transaction"); // Link to your user model
const { setupDB } = require("./test-setup");


describe("router", () => {
  it("Should create transaction", async done => {
    const res = await request.post("/api/transaction/bulk").send({
      name: "fries",
      value: 1000
    });

    // Searches the user in the database
    const transaction = await Transaction.findOne({ name: "fries" });
    expect(transaction.name).toBe("fries");
    expect(transaction.value).toBe(1000);
    done();
  
  });

  it("Should read all transaction", async done => {
    const res = await request.get("/api/transaction")

    // Searches the user in the database
    const transaction = await Transaction.find({}).sort({date: -1});
    expect(transaction).toBeTruthy();
    done();
  });


  // it("Should update all transaction", async done => {
  //   let id = "5f71b926901f701baa3ca637"
  //   const res = await request.put("/api/updatetransaction/:id").send({
  //     name: "ice cream",
  //     value: 3000
  //   });

  //   // Searches the user in the database
  //   const transaction = await Transaction.findByIdAndUpdate({_id: id}, {$set: req.body});
  //   expect(transaction.name).toBe("ice cream");
  //   expect(transaction.value).toBe(3000);
  //   done();
  // });

  // setupDB.afterEach;
});