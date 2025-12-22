// Initialize categories (static categories, no longer stored in localStorage)
function initializeCategories() {
    // Categories are now loaded dynamically or kept as constants
    // This function is kept for backward compatibility
}

// Load categories based on selected type
function loadCategories(type) {
    const categories = {
        income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
        expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other Expense']
    };
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
        type: $type,
        category: $category,
        amount: parseFloat($amount),
        date: new Date($date).toISOString(),
        description: $description
    };

    console.log('Submitting transaction:', transaction);

    fetch('https://localhost:7067/api/Expenses/AddExpense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(error => {
                    throw new Error(error);
                });
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            showSuccessMessage('Transaction added successfully!');

            // Reset form
            $('#transaction-form')[0].reset();
            $('#category').prop('disabled', true);
        })
        .catch(error => {
            console.error('Error adding transaction:', error);
            showErrorMessage('Failed to add transaction: ' + error.message);
        });
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

// Show error message
function showErrorMessage(message) {
    const errorAlert = $('#error-alert');
    if (errorAlert.length) {
        errorAlert.find('.alert-message').text(message);
        errorAlert.show();
        // Hide after 3 seconds
        setTimeout(() => {
            errorAlert.hide();
        }, 3000);
    } else {
        alert(message);
    }
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