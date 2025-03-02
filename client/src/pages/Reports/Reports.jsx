import { useState } from 'react';
import './Reports.css';

function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const monthlyData = {
    income: 85000,
    expenses: 45000,
    savings: 40000,
    categories: {
      Groceries: 12500,
      Rent: 25000,
      Transportation: 3200,
      Utilities: 6500,
      Entertainment: 4800,
      Shopping: 8900,
      Healthcare: 2000,
      Education: 7500
    },
    transactions: [
      { id: 1, date: '2024-03-01', description: 'Salary', amount: 85000, type: 'income', category: 'Salary' },
      { id: 2, date: '2024-03-02', description: 'Rent Payment', amount: 25000, type: 'expense', category: 'Rent' },
      { id: 3, date: '2024-03-05', description: 'Grocery Shopping', amount: 4500, type: 'expense', category: 'Groceries' },
      { id: 4, date: '2024-03-07', description: 'Internet Bill', amount: 1499, type: 'expense', category: 'Utilities' },
      { id: 5, date: '2024-03-10', description: 'Movie Night', amount: 1200, type: 'expense', category: 'Entertainment' }
    ]
  };

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculatePercentage = (amount, total) => {
    return ((amount / total) * 100).toFixed(1);
  };

  const getFilteredTransactions = () => {
    if (selectedCategory === 'all') {
      return monthlyData.transactions;
    }
    return monthlyData.transactions.filter(t => t.category === selectedCategory);
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Financial Reports</h1>
        <div className="period-selector">
          <button 
            className={`period-button ${selectedPeriod === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Monthly
          </button>
          <button 
            className={`period-button ${selectedPeriod === 'quarter' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('quarter')}
          >
            Quarterly
          </button>
          <button 
            className={`period-button ${selectedPeriod === 'year' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('year')}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="reports-summary">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <p className="amount">{formatIndianCurrency(monthlyData.income)}</p>
          <div className="trend positive">↑ 5.2% from last month</div>
        </div>
        <div className="summary-card expenses">
          <h3>Total Expenses</h3>
          <p className="amount">{formatIndianCurrency(monthlyData.expenses)}</p>
          <div className="trend negative">↑ 2.8% from last month</div>
        </div>
        <div className="summary-card savings">
          <h3>Total Savings</h3>
          <p className="amount">{formatIndianCurrency(monthlyData.savings)}</p>
          <div className="trend positive">↑ 8.5% from last month</div>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card spending-by-category">
          <h3>Spending by Category</h3>
          <div className="category-list">
            {Object.entries(monthlyData.categories).map(([category, amount]) => (
              <div 
                key={category} 
                className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(category === selectedCategory ? 'all' : category)}
              >
                <div className="category-info">
                  <span className="category-name">{category}</span>
                  <span className="category-amount">{formatIndianCurrency(amount)}</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-progress"
                    style={{ width: `${calculatePercentage(amount, monthlyData.expenses)}%` }}
                  ></div>
                </div>
                <span className="category-percentage">
                  {calculatePercentage(amount, monthlyData.expenses)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="report-card recent-transactions">
          <h3>Transaction History</h3>
          <div className="transactions-list">
            {getFilteredTransactions().map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-date">
                    {new Date(transaction.date).toLocaleDateString('en-IN', { 
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  <div className="transaction-description">
                    {transaction.description}
                    <span className="transaction-category-tag">
                      {transaction.category}
                    </span>
                  </div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'expense' ? '-' : '+'}
                  {formatIndianCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="report-card savings-analysis">
          <h3>Savings Analysis</h3>
          <div className="savings-stats">
            <div className="stat-item">
              <span className="stat-label">Savings Rate</span>
              <span className="stat-value">
                {calculatePercentage(monthlyData.savings, monthlyData.income)}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Monthly Target</span>
              <span className="stat-value">{formatIndianCurrency(50000)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Progress</span>
              <div className="progress-bar">
                <div 
                  className="progress"
                  style={{ 
                    width: `${(monthlyData.savings / 50000) * 100}%`,
                    backgroundColor: monthlyData.savings >= 50000 ? 'var(--success-color)' : 'var(--primary-color)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports; 