// Calculate and display financial summary
function loadDashboard() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Calculate totals
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpenses += transaction.amount;
        }
    });

    // Calculate balance
    const currentBalance = totalIncome - totalExpenses;

    // Update the dashboard cards
    $('#total-income').text('$' + totalIncome.toFixed(2));
    $('#total-expenses').text('$' + totalExpenses.toFixed(2));
    $('#current-balance').text('$' + currentBalance.toFixed(2));

    // Load recent transactions
    loadRecentTransactions(transactions);
}

// Load recent transactions (last 5)
function loadRecentTransactions(transactions) {
    const tbody = $('#transactions-body');

    // Clear existing rows
    tbody.html('');
    // Check if there are transactions
    if (transactions.length === 0) {
        tbody.html('<tr><td colspan="5" class="text-center text-muted">No transactions yet</td></tr>');
        return;
    }

    // Sort by date (newest first) and take only the last 5
    const recentTransactions = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // Display each transaction
    recentTransactions.forEach(transaction => {
        const $row = $('<tr></tr>');

        // Format amount with $ sign and color
        const amountClass = transaction.type === 'income' ? 'text-success' : 'text-danger';
        const amountSign = transaction.type === 'income' ? '+' : '-';

        $row.html(`
            <td>${formatDate(transaction.date)}</td>
            <td><span class="badge bg-${transaction.type === 'income' ? 'success' : 'danger'}">${transaction.type}</span></td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td class="${amountClass} fw-bold">${amountSign}$${transaction.amount.toFixed(2)}</td>
        `);
            
        tbody.append($row);
    });
}

// Format date to readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Initialize when page loads
$(document).ready(function() {
    loadDashboard();
});