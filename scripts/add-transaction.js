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
    const $categorySelect = $('#category');

    // Clear existing options
    $categorySelect.html('<option value="">Select Category</option>');

    // Add categories based on type
    if (type && categories[type]) {
        $categorySelect.prop('disabled', false);
        categories[type].forEach(category => {
            const option = $('<option></option>');
            option.val(category);
            option.text(category);
            $categorySelect.append(option);
        });
    } else {
        $categorySelect.prop('disabled', true);
    }
}

// Handle form submission
function submitFormData(event) {
    event.preventDefault();

    // Get form values
    const $type = $('#type').val();
    const $category = $('#category').val();
    const $amount = $('#amount').val();
    const $date = $('#date').val();
    const $description = $('#description').val();
    // Create transaction object
    const transaction = {
        id: Date.now(),
        type: $type,
        category: $category,
        amount: parseFloat($amount),
        date: $date,
        description: $description
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
    $('#transaction-form')[0].reset();
    $('#category').prop('disabled', true);
}

// Show success message
function showSuccessMessage(message) {
    const successAlert = $('#success-alert');
    const successMessage = $('#success-message');

    successMessage.text(message);
    successAlert.show();
    // Hide after 3 seconds
    setTimeout(() => {
        successAlert.hide();
    }, 3000);
}

// Initialize when page loads
$(document).ready(function() {
    // Initialize categories
    initializeCategories();

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    $('#date').val(today);

    // Listen for type changes
    $('#type').on('change', function() {
        loadCategories(this.value);
    });
});