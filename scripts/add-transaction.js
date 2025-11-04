// Initialize categories in localStorage when app starts
function initializeCategories() {
    const categories = {
        income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
        expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other Expense']
    };

    // Store categories in localStorage if not already there
    if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify(categories));
    }
}

// Load categories based on selected type
function loadCategories(type) {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const categorySelect = document.getElementById('category');

    // Clear existing options
    categorySelect.innerHTML = '<option value="">Select Category</option>';

    // Add categories based on type
    if (type && categories[type]) {
        categorySelect.disabled = false;
        categories[type].forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    } else {
        categorySelect.disabled = true;
    }
}

// Handle form submission
function submitFormData(event) {
    event.preventDefault();

    // Get form values
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    // Create transaction object
    const transaction = {
        id: Date.now(),
        type: type,
        category: category,
        amount: parseFloat(amount),
        date: date,
        description: description
    };

    // Get existing transactions from localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Add new transaction
    transactions.push(transaction);

    // Save to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Show success message
    showSuccessMessage('Transaction added successfully!');

    // Reset form
    document.getElementById('transaction-form').reset();
    document.getElementById('category').disabled = true;
}

// Show success message
function showSuccessMessage(message) {
    const successAlert = document.getElementById('success-alert');
    const successMessage = document.getElementById('success-message');

    successMessage.textContent = message;
    successAlert.style.display = 'block';

    // Hide after 3 seconds
    setTimeout(() => {
        successAlert.style.display = 'none';
    }, 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize categories
    initializeCategories();

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;

    // Listen for type changes
    document.getElementById('type').addEventListener('change', function() {
        loadCategories(this.value);
    });
});