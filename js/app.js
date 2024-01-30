
document.addEventListener("DOMContentLoaded", function () {
  tabChange(1)
  // Load existing expenses from local storage on page load
  loadExpenses();
  loadIncomes();
  calculate()
});


function tabChange(tab){
  if(tab === 1){
    console.log("hello i am one")
    document.getElementById("expenseSection").style.display = "none";
    document.getElementById("incomeSection").style.display = "block";
    document.getElementById("tab-one").classList.add("active-tab")
    document.getElementById("tab-two").classList.remove("active-tab")
  }
  else if(tab === 2){
    document.getElementById("incomeSection").style.display = "none";
    document.getElementById("expenseSection").style.display = "block";
    document.getElementById("tab-two").classList.add("active-tab")
    document.getElementById("tab-one").classList.remove("active-tab")
  }
}
// Get existing expenses from local storage
let existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
function addExpense() {
  // Get values from the form
  let date = document.getElementById("date").value;
  let expenseName = document.getElementById("expenseName").value;
  let amount = document.getElementById("amount").value;

  // Validate input
  if (!date || !expenseName || !amount) {
    alert("Please fill in all fields.");
    return;
  }
  // Create a new expense object
  let expense = {
    date: date,
    expenseName: expenseName,
    amount: amount
  };

  // Add the new expense to the existing expenses array
  existingExpenses.push(expense);

  // Save the updated expenses array back to local storage
  localStorage.setItem("expenses", JSON.stringify(existingExpenses));

  // Clear the form
  document.getElementById("date").value = "";
  document.getElementById("expenseName").value = "";
  document.getElementById("amount").value = "";

  // Reload the expenses in the table
  loadExpenses();
  calculate()
}

// Get existing expenses from local storage
let existingIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
function addIncome() {
  // Get values from the form
  let date = document.getElementById("income_date").value;
  let incomeSource = document.getElementById("income_source").value;
  let amount = document.getElementById("income_amount").value;

  // Validate input
  if (!date || !incomeSource || !amount) {
    alert("Please fill in all fields.");
    return;
  }
  // Create a new expense object
  let income = {
    date: date,
    source: incomeSource,
    amount: amount
  };


  // Add the new expense to the existing expenses array
  existingIncomes.push(income);

  // Save the updated expenses array back to local storage
  localStorage.setItem("incomes", JSON.stringify(existingIncomes));

  // Clear the form
  document.getElementById("income_date").value = "";
  document.getElementById("income_source").value = "";
  document.getElementById("income_amount").value = "";

  // Reload the expenses in the table
  loadIncomes();
  calculate()
}



function loadExpenses() {
  // Get the tbody element
  let tbody = document.getElementById("expenseBody");

  // Clear existing rows in the table
  tbody.innerHTML = "";

  // Loop through each expense and add a new row to the table
  existingExpenses.forEach(function (expense) {
    let row = tbody.insertRow();

    let cell1 = row.insertCell(0);
    cell1.textContent = expense.date;

    let cell2 = row.insertCell(1);
    cell2.textContent = expense.expenseName;

    let cell3 = row.insertCell(2);
    cell3.textContent = expense.amount;
  });
}
function loadIncomes() {

  // Get the tbody element
  let tbody = document.getElementById("incomeBody");

  // Clear existing rows in the table
  tbody.innerHTML = "";

  // Loop through each expense and add a new row to the table
  existingIncomes.forEach(function (income) {
    let row = tbody.insertRow();

    let cell1 = row.insertCell(0);
    cell1.textContent = income.date;

    let cell2 = row.insertCell(1);
    cell2.textContent = income.source;

    let cell3 = row.insertCell(2);
    cell3.textContent = income.amount;
  });
}


function calculate () {
  let incomes = 0
  for(let income of existingIncomes){
    console.log("income", income)
    incomes = incomes + Number(income?.amount)
  }
  let expenses = 0
  for(let expense of existingExpenses){
    console.log("income", expense)
    expenses = expenses + Number(expense?.amount)
  }
  const save = incomes - expenses
  let isSave = save >=0
  if(save < 0){
    document.getElementById("savings-title").innerHTML = "Overflow";
    document.getElementById("savings").innerHTML = Math.abs(save);
  }
  else{
    document.getElementById("savings-title").innerHTML = "Savings";
    document.getElementById("savings").innerHTML = save;
  }

  document.getElementById("allIncome").innerHTML = incomes;
  document.getElementById("allExpense").innerHTML = expenses;

  console.log("in", incomes, isSave)
}
