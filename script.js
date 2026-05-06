// 1. Grab HTML Elements
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const addButton = document.getElementById('add-btn');
const expenseList = document.getElementById('expense-list');
const totalButton = document.getElementById('total-btn');
const totalDisplay = document.getElementById('total-display');
const resetButton = document.getElementById('reset-btn');

// 1.1 New Element Grabs
const categoryInput = document.getElementById('expense-category');
const themeToggle = document.getElementById('theme-toggle');

// FIX 1: Initialize the expenses array from Local Storage
let expenses = JSON.parse(localStorage.getItem('myExpenses')) || [];

// 2. Updated Display Function (Now with Delete Buttons)
function displayExpenses() {
    expenseList.innerHTML = '';
    
    expenses.forEach(function(item, index) {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = `
            <div>
                <strong>${item.category}:</strong> ${item.name} 
                <span>₹${item.amount}</span>
            </div>
            <button class="delete-btn" onclick="deleteItem(${index})">X</button>
        `;
        expenseList.appendChild(newListItem);
    });
}

// 4. Function to Add a new Expense
function addExpense() {
    const nameValue = nameInput.value;
    const amountValue = Number(amountInput.value);
    const categoryValue = categoryInput.value;

    if (nameValue === '' || amountValue <= 0) {
        alert('Please enter valid details!');
        return; 
    }

    const newExpenseData = {
        name: nameValue,
        amount: amountValue,
        category: categoryValue
    };

    expenses.push(newExpenseData);
    localStorage.setItem('myExpenses', JSON.stringify(expenses));
    displayExpenses();
    
    nameInput.value = '';
    amountInput.value = '';
}

// 5. Function to Calculate Total
function calculateTotal() {
    let sum = 0;
    for (let i = 0; i < expenses.length; i++) {
        sum += expenses[i].amount;
    }
    totalDisplay.innerText = `Total: ₹${sum}`;
}

// Function to Reset all data
function resetData() {
    const isSure = confirm("Are you sure you want to delete all history?");
    if (isSure) {
        expenses = [];
        localStorage.removeItem('myExpenses');
        displayExpenses();
        totalDisplay.innerText = 'Total: ₹0';
    }
}

// 4. NEW: Individual Delete Logic
function deleteItem(index) {
    // Filter out the item at the specific index
    expenses = expenses.filter((_, i) => i !== index);
    
    // Update storage and screen
    localStorage.setItem('myExpenses', JSON.stringify(expenses));
    displayExpenses();
    
    // Optional: Update total automatically after deleting
    calculateTotal();
} // FIX 2: Added the missing closing bracket here

// 6. Listeners and Startup
addButton.addEventListener('click', addExpense);
totalButton.addEventListener('click', calculateTotal);
resetButton.addEventListener('click', resetData);

// 5. NEW: Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

// Run this once when the page first opens to show past history
displayExpenses();