// 1. Grab HTML Elements
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const addButton = document.getElementById('add-btn');
const expenseList = document.getElementById('expense-list');
const totalButton = document.getElementById('total-btn');
const totalDisplay = document.getElementById('total-display');
const resetButton = document.getElementById('reset-btn');

// 2. Load data from Local Storage (or start an empty list)
// JSON.parse turns the text string back into a usable JavaScript Array
let expenses = JSON.parse(localStorage.getItem('myExpenses')) || [];

// 3. Function to draw the expenses onto the screen
function displayExpenses() {
    expenseList.innerHTML = ''; // Clear the list first
    
    // Loop through our saved data and create HTML for each one
    expenses.forEach(function(item) {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = `${item.name} <span>₹${item.amount}</span>`;
        expenseList.appendChild(newListItem);
    });
}

// 4. Function to Add a new Expense
function addExpense() {
    const nameValue = nameInput.value;
    const amountValue = Number(amountInput.value); // Convert text to a Number for math later

    if (nameValue === '' || amountValue <= 0) {
        alert('Please enter a valid name and amount!');
        return; 
    }

    // Create an "Object" holding the data
    const newExpenseData = {
        name: nameValue,
        amount: amountValue
    };

    // Add to our array
    expenses.push(newExpenseData);

    // Save the updated array to the browser's Local Storage
    // JSON.stringify turns our Javascript Array into a simple text string so it can be saved
    localStorage.setItem('myExpenses', JSON.stringify(expenses));

    // Update the screen
    displayExpenses();

    // Clear inputs
    nameInput.value = '';
    amountInput.value = '';
}

// 5. Function to Calculate Total
function calculateTotal() {
    let sum = 0;
    
    // Loop through all expenses and add their amounts together
    for (let i = 0; i < expenses.length; i++) {
        sum += expenses[i].amount;
    }

    // Display the final number on the screen
    totalDisplay.innerText = `Total: ₹${sum}`;
}
// Function to Reset all data
function resetData() {
    // 1. The Safety Check: Ask the user to confirm before deleting
    const isSure = confirm("Are you sure you want to delete all history? This cannot be undone.");
    
    // If they click "OK" on the popup, proceed with deleting
    if (isSure) {
        // 2. Empty our master JavaScript array
        expenses = [];
        
        // 3. Remove the data completely from the browser's Local Storage
        localStorage.removeItem('myExpenses');
        
        // 4. Update the screen to show an empty list
        displayExpenses();
        
        // 5. Reset the total text back to zero
        totalDisplay.innerText = 'Total: ₹0';
    }
}

// 6. Listeners and Startup
addButton.addEventListener('click', addExpense);
totalButton.addEventListener('click', calculateTotal);
resetButton.addEventListener('click', resetData);

// Run this once when the page first opens to show past history
displayExpenses();