import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [totalBalance, setTotalBalance] = useState(250000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(45000);
  const [monthlyBudget, setMonthlyBudget] = useState(60000);
  const [savingsGoal, setSavingsGoal] = useState(1000000);
  const [creditScore, setCreditScore] = useState(750);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [accounts, setAccounts] = useState([
    { id: 1, name: 'HDFC Savings', type: 'Savings', balance: 150000, icon: '🏦' },
    { id: 2, name: 'ICICI Salary', type: 'Savings', balance: 85000, icon: '💰' },
    { id: 3, name: 'SBI Credit Card', type: 'Credit', balance: -15000, icon: '💳' },
    { id: 4, name: 'Fixed Deposit', type: 'Investment', balance: 100000, icon: '📈' }
  ]);

  const [bills, setBills] = useState([
    { id: 1, name: 'Electricity Bill', dueDate: '2024-03-15', amount: 2800, status: 'upcoming', icon: '⚡' },
    { id: 2, name: 'Home Rent', dueDate: '2024-03-01', amount: 25000, status: 'paid', icon: '🏠' },
    { id: 3, name: 'Internet Bill', dueDate: '2024-03-10', amount: 1499, status: 'upcoming', icon: '🌐' },
    { id: 4, name: 'Mobile Bill', dueDate: '2024-03-20', amount: 999, status: 'upcoming', icon: '📱' }
  ]);

  const [investments, setInvestments] = useState([
    { id: 1, name: 'PPF', value: 200000, returns: 7.1, trend: 'up', icon: '💹' },
    { id: 2, name: 'Mutual Funds', value: 150000, returns: 12.5, trend: 'up', icon: '📊' },
    { id: 3, name: 'Stocks', value: 75000, returns: 15.2, trend: 'down', icon: '📈' }
  ]);

  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      description: 'Grocery Shopping',
      merchant: 'D-Mart',
      amount: 4500,
      type: 'expense',
      category: 'Shopping',
      date: new Date(),
      icon: '🛒'
    },
    { 
      id: 2, 
      description: 'Salary Deposit',
      merchant: 'Employer',
      amount: 65000,
      type: 'income',
      category: 'Salary',
      date: new Date(Date.now() - 86400000),
      icon: '💵'
    },
    { 
      id: 3, 
      description: 'Electricity Bill',
      merchant: 'State Electricity Board',
      amount: 2800,
      type: 'expense',
      category: 'Utilities',
      date: new Date(Date.now() - 172800000),
      icon: '⚡'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All', icon: '📊' },
    { id: 'shopping', name: 'Shopping', icon: '🛒' },
    { id: 'food', name: 'Food & Dining', icon: '🍽️' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'utilities', name: 'Utilities', icon: '💡' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' }
  ];

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    const now = new Date();
    const today = now.toDateString();
    const yesterday = new Date(now.setDate(now.getDate() - 1)).toDateString();
    const transactionDate = new Date(date).toDateString();

    if (transactionDate === today) return 'Today';
    if (transactionDate === yesterday) return 'Yesterday';
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
    setShowAddModal(false);
    // Update balances and budgets
    if (newTransaction.type === 'expense') {
      setMonthlyExpenses(prev => prev + newTransaction.amount);
      setTotalBalance(prev => prev - newTransaction.amount);
    } else {
      setTotalBalance(prev => prev + newTransaction.amount);
    }
  };

  const handlePayBill = (billId) => {
    setBills(prev => prev.map(bill => 
      bill.id === billId ? { ...bill, status: 'paid' } : bill
    ));
    // Update balances
    const bill = bills.find(b => b.id === billId);
    if (bill) {
      setTotalBalance(prev => prev - bill.amount);
      setMonthlyExpenses(prev => prev + bill.amount);
    }
  };

  const getSpendingByCategory = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome to BudgetBuddy</h1>
          <p className="date-display">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="quick-actions">
          <button className="button" onClick={() => setShowAddModal(true)}>
            <span className="button-icon">➕</span>
            Add Transaction
          </button>
          <button className="button">
            <span className="button-icon">🏦</span>
            Add Account
          </button>
          <button className="button">
            <span className="button-icon">💸</span>
            Pay Bill
          </button>
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="card net-worth">
          <h3>Net Worth</h3>
          <p className="amount large">{formatIndianCurrency(totalBalance)}</p>
          <div className="trend positive">
            <span className="trend-icon">↑</span>
            2.5% from last month
          </div>
          <div className="mini-stats">
            <div className="mini-stat">
              <span className="label">Income</span>
              <span className="value positive">+₹75,000</span>
            </div>
            <div className="mini-stat">
              <span className="label">Expenses</span>
              <span className="value negative">-₹45,000</span>
            </div>
          </div>
        </div>
        
        <div className="card credit-score">
          <h3>Credit Score</h3>
          <div className="score-display">
            <div className="score">{creditScore}</div>
            <div className="score-bar">
              <div 
                className="score-progress" 
                style={{ width: `${(creditScore / 900) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="score-label">Excellent</p>
          <p className="score-update">Last updated: Today</p>
        </div>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card accounts-overview">
          <div className="card-header">
            <h3>
              <span className="header-icon">🏦</span>
              Accounts
            </h3>
            <button className="button-link">View All</button>
          </div>
          <div className="accounts-list">
            {accounts.map(account => (
              <div key={account.id} className="account-item">
                <div className="account-info">
                  <span className="account-icon">{account.icon}</span>
                  <div>
                    <h4>{account.name}</h4>
                    <p className="account-type">{account.type}</p>
                  </div>
                </div>
                <p className={`amount ${account.balance < 0 ? 'negative' : ''}`}>
                  {formatIndianCurrency(account.balance)}
                </p>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <p className="total-balance">Total: {formatIndianCurrency(accounts.reduce((sum, acc) => sum + acc.balance, 0))}</p>
          </div>
        </div>

        <div className="card monthly-overview">
          <div className="card-header">
            <h3>
              <span className="header-icon">📊</span>
              Monthly Overview
            </h3>
            <button className="button-link">Set Budget</button>
          </div>
          <div className="budget-overview">
            <div className="budget-item">
              <h4>Spent</h4>
              <p className="amount">{formatIndianCurrency(monthlyExpenses)}</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ 
                    width: `${(monthlyExpenses / monthlyBudget) * 100}%`,
                    backgroundColor: monthlyExpenses > monthlyBudget ? 'var(--accent-color)' : 'var(--secondary-color)'
                  }}
                ></div>
              </div>
              <p className="subtitle">of {formatIndianCurrency(monthlyBudget)} budget</p>
            </div>
            <div className="spending-breakdown">
              {Object.entries(getSpendingByCategory()).map(([category, amount]) => (
                <div key={category} className="category-spend">
                  <span className="category-name">{category}</span>
                  <span className="category-amount">{formatIndianCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bills-due">
          <div className="card-header">
            <h3>
              <span className="header-icon">📅</span>
              Upcoming Bills
            </h3>
            <button className="button-link">View All</button>
          </div>
          <div className="bills-list">
            {bills.filter(bill => bill.status === 'upcoming').map(bill => (
              <div key={bill.id} className="bill-item">
                <div className="bill-info">
                  <span className="bill-icon">{bill.icon}</span>
                  <div>
                    <h4>{bill.name}</h4>
                    <p className="due-date">Due: {new Date(bill.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>
                <div className="bill-actions">
                  <p className="amount">{formatIndianCurrency(bill.amount)}</p>
                  <button 
                    className="pay-button"
                    onClick={() => handlePayBill(bill.id)}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card investments-overview">
          <div className="card-header">
            <h3>
              <span className="header-icon">📈</span>
              Investments
            </h3>
            <button className="button-link">View Details</button>
          </div>
          <div className="investments-list">
            {investments.map(investment => (
              <div key={investment.id} className="investment-item">
                <div className="investment-info">
                  <span className="investment-icon">{investment.icon}</span>
                  <div>
                    <h4>{investment.name}</h4>
                    <p className="returns">
                      <span className={`trend-indicator ${investment.trend}`}>
                        {investment.trend === 'up' ? '↑' : '↓'}
                      </span>
                      Returns: {investment.returns}%
                    </p>
                  </div>
                </div>
                <p className="amount">{formatIndianCurrency(investment.value)}</p>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <p className="total-investments">
              Total Investments: {formatIndianCurrency(investments.reduce((sum, inv) => sum + inv.value, 0))}
            </p>
          </div>
        </div>
      </div>

      <div className="card recent-transactions">
        <div className="card-header">
          <h3>
            <span className="header-icon">📝</span>
            Recent Transactions
          </h3>
          <button className="button-link">View All</button>
        </div>
        <div className="transactions-list">
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction">
              <div className="transaction-info">
                <span className="transaction-icon">{transaction.icon}</span>
                <div>
                  <h4>{transaction.description}</h4>
                  <p>{transaction.merchant}</p>
                </div>
              </div>
              <div className="transaction-details">
                <p className="transaction-date">{formatDate(transaction.date)}</p>
                <p className={`transaction-amount ${transaction.type === 'income' ? 'income' : ''}`}>
                  {transaction.type === 'expense' ? '-' : '+'}
                  {formatIndianCurrency(transaction.amount)}
                </p>
                <span className="transaction-category">{transaction.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Transaction</h2>
            {/* Add transaction form */}
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 