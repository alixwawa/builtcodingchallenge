let transactions = [];
let myChart;

fetch("/api/transaction")
  .then(response => {
    return response.json();
  })
  .then(data => {
    // save db data on global variable
    transactions = data;

    populateTotal();
    populateTable();
    populateChart();

  });


function populateTotal() {
  // reduce transaction amounts to a single total value
  let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}

function populateTable() {
  let tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";



  transactions.forEach(transaction => {
    // create and populate a table row
    // console.log(transaction)
    let tr = document.createElement("tr");
    //added delete and update function buttons
    tr.innerHTML = `
      <td>${transaction.name} 
      <button type="button" onclick="mydelFunction(value)" value="${transaction._id}" id="del-btn"><i></i> Delete Transaction</button> 
      <button type="button" onclick="myupdateFunction(value)" value="${transaction._id}" id="update-btn"><i></i> Update Transaction</button></td>
      <td>${transaction.value}</td>
    `;

    tbody.appendChild(tr);
  });
}

//delete function 
async function mydelFunction(value) {
  $.ajax({
    type: "DELETE",
    url: "/api/deletetransaction",
    data: {
      _id: value,
    },
  }).then(location.reload());
}

//update function 
function myupdateFunction(value) {
  let id = value
  let updateWhat = prompt("would you like to change the name, the value, or both?")
  switch (updateWhat) {
    case "name":
        var updateName = prompt("would you like to change the name to?");
        $.ajax({
          type: "PUT",
          url: "/api/updatetransaction/" + id,
          data: {
            name: updateName
          },
        }).then(location.reload());;
      break;
    case "value":
        var updateValue = prompt("would you like to change the value to?");
        $.ajax({
          type: "PUT",
          url: "/api/updatetransaction/" + id,
          data: {
            value: updateValue
          },
        }).then(location.reload());;
      break;
    case "both":
        var updatebothName = prompt("would you like to change the name to?")
        var updatebothValue = prompt("would you like to change the value to?")
        $.ajax({
          type: "PUT",
          url: "/api/updatetransaction/" + id,
          data: {
            name: updatebothName,
            value: updatebothValue
          },
        }).then(location.reload());
      break;
    default:
      console.log("didn't work");
      break;
  }
}


function populateChart() {
  // copy array and reverse it
  let reversed = transactions.slice().reverse();
  let sum = 0;

  // create date labels for chart
  let labels = reversed.map(t => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental values for chart
  let data = reversed.map(t => {
    sum += parseInt(t.value);
    return sum;
  });

  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  let ctx = document.getElementById("myChart").getContext("2d");

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: "Total Over Time",
        fill: true,
        backgroundColor: "#6666ff",
        data
      }]
    }
  });
}

function sendTransaction(isAdding) {
  let nameEl = document.querySelector("#t-name");
  let amountEl = document.querySelector("#t-amount");
  let errorEl = document.querySelector(".form .error");

  // validate form
  if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  }
  else {
    errorEl.textContent = "";
  }

  // create record
  let transaction = {
    name: nameEl.value,
    value: amountEl.value,
    date: new Date().toISOString()
  };

  // if subtracting funds, convert amount to negative number
  if (!isAdding) {
    transaction.value *= -1;
  }

  // add to beginning of current array of data
  transactions.unshift(transaction);

  // re-run logic to populate ui with new record
  populateChart();
  populateTable();
  populateTotal();

  // also send to server
  fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      }
      else {
        // clear form
        nameEl.value = "";
        amountEl.value = "";
      }
    })
    .catch(err => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);

      // clear form
      nameEl.value = "";
      amountEl.value = "";
    });
}

document.querySelector("#add-btn").onclick = function () {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function () {
  sendTransaction(false);
};



