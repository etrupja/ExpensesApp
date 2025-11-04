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
    document.getElementById('total-income').textContent = '$' + totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = '$' + totalExpenses.toFixed(2);
    document.getElementById('current-balance').textContent = '$' + currentBalance.toFixed(2);

    // Load recent transactions
    loadRecentTransactions(transactions);
}

// Load recent transactions (last 5)
function loadRecentTransactions(transactions) {
    const tbody = document.getElementById('transactions-body');

    // Clear existing rows
    tbody.innerHTML = '';

    // Check if there are transactions
    if (transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No transactions yet</td></tr>';
        return;
    }

    // Sort by date (newest first) and take only the last 5
    const recentTransactions = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // Display each transaction
    recentTransactions.forEach(transaction => {
        const row = document.createElement('tr');

        // Format amount with $ sign and color
        const amountClass = transaction.type === 'income' ? 'text-success' : 'text-danger';
        const amountSign = transaction.type === 'income' ? '+' : '-';

        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td><span class="badge bg-${transaction.type === 'income' ? 'success' : 'danger'}">${transaction.type}</span></td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td class="${amountClass} fw-bold">${amountSign}$${transaction.amount.toFixed(2)}</td>
        `;

        tbody.appendChild(row);
    });
}

// Format date to readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});