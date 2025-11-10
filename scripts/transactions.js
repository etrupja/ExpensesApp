// Load and display all transactions
function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const $tbody = $('#transactions-body');

    // Clear existing rows
    $tbody.empty();

    // Check if there are transactions
    if (transactions.length === 0) {
        $tbody.html('<tr><td colspan="6" class="text-center text-muted">No transactions yet</td></tr>');
        return;
    }

    // Sort transactions by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Display each transaction
    transactions.forEach(transaction => {
        const amountClass = transaction.type === 'income' ? 'text-success' : 'text-danger';
        const amountSign = transaction.type === 'income' ? '+' : '-';

        const row = $('<tr>').html(`
            <td>${formatDate(transaction.date)}</td>
            <td><span class="badge bg-${transaction.type === 'income' ? 'success' : 'danger'}">${transaction.type}</span></td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td class="${amountClass} fw-bold">${amountSign}$${transaction.amount.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger delete-btn" data-transaction-id="${transaction.id}">Delete</button>
            </td>
        `);

        $tbody.append(row);
    });
}

// Format date to readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Delete transaction
function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions = transactions.filter(t => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        loadTransactions();
    }
}

// Filter transactions
function filterTransactions() {
    const filterType = $('#filterType').val();
    const filterDateFrom = $('#filterDateFrom').val();
    const filterDateTo = $('#filterDateTo').val();

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Apply filters
    if (filterType !== 'all') {
        transactions = transactions.filter(t => t.type === filterType);
    }

    if (filterDateFrom) {
        transactions = transactions.filter(t => t.date >= filterDateFrom);
    }

    if (filterDateTo) {
        transactions = transactions.filter(t => t.date <= filterDateTo);
    }

    // Display filtered transactions
    displayFilteredTransactions(transactions);
}

// Display filtered transactions
function displayFilteredTransactions(transactions) {
    const $tbody = $('#transactions-body');
    $tbody.empty();

    if (transactions.length === 0) {
        $tbody.html('<tr><td colspan="6" class="text-center text-muted">No transactions found</td></tr>');
        return;
    }

    // Sort by date
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Display each transaction
    transactions.forEach(transaction => {
        const amountClass = transaction.type === 'income' ? 'text-success' : 'text-danger';
        const amountSign = transaction.type === 'income' ? '+' : '-';

        const row = $('<tr>').html(`
            <td>${formatDate(transaction.date)}</td>
            <td><span class="badge bg-${transaction.type === 'income' ? 'success' : 'danger'}">${transaction.type}</span></td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td class="${amountClass} fw-bold">${amountSign}$${transaction.amount.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger delete-btn" data-transaction-id="${transaction.id}">Delete</button>
            </td>
        `);

        $tbody.append(row);
    });
}

// Initialize when page loads
$(document).ready(function() {
    // Load transactions
    loadTransactions();

    // Add event listeners for filters
    $('#filterType').on('change', filterTransactions);
    $('#filterDateFrom').on('change', filterTransactions);
    $('#filterDateTo').on('change', filterTransactions);

    // Handle delete button clicks using event delegation
    $(document).on('click', '.delete-btn', function() {
        const transactionId = parseInt($(this).data('transaction-id'));
        deleteTransaction(transactionId);
    });
});