import { useState } from 'react';
import './Budget.css';

function Budget() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Groceries', allocated: 15000, spent: 12500, icon: '🛒' },
    { id: 2, category: 'Rent', allocated: 25000, spent: 25000, icon: '🏠' },
    { id: 3, category: 'Transportation', allocated: 5000, spent: 3200, icon: '🚗' },
    { id: 4, category: 'Utilities', allocated: 8000, spent: 6500, icon: '💡' },
    { id: 5, category: 'Entertainment', allocated: 6000, spent: 4800, icon: '🎬' },
    { id: 6, category: 'Shopping', allocated: 10000, spent: 8900, icon: '🛍️' },
    { id: 7, category: 'Healthcare', allocated: 5000, spent: 2000, icon: '⚕️' },
    { id: 8, category: 'Education', allocated: 8000, spent: 7500, icon: '📚' }
  ]);

  const [newBudget, setNewBudget] = useState({
    category: '',
    allocated: 0,
    icon: '📊'
  });

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = (spent, allocated) => {
    return (spent / allocated) * 100;
  };

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (newBudget.category && newBudget.allocated > 0) {
      setBudgets(prev => [...prev, {
        id: prev.length + 1,
        ...newBudget,
        spent: 0
      }]);
      setNewBudget({ category: '', allocated: 0, icon: '📊' });
    }
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  return (
    <div className="budget-container">
      <div className="budget-header">
        <h1>Budget Planning</h1>
        <div className="budget-summary">
          <div className="summary-card">
            <h3>Total Budget</h3>
            <p className="amount">{formatIndianCurrency(totalBudget)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Spent</h3>
            <p className="amount">{formatIndianCurrency(totalSpent)}</p>
          </div>
          <div className="summary-card">
            <h3>Remaining</h3>
            <p className="amount">{formatIndianCurrency(totalBudget - totalSpent)}</p>
          </div>
        </div>
      </div>

      <div className="budget-grid">
        {budgets.map(budget => (
          <div key={budget.id} className="budget-card">
            <div className="budget-card-header">
              <span className="category-icon">{budget.icon}</span>
              <h3>{budget.category}</h3>
            </div>
            <div className="budget-details">
              <div className="budget-amounts">
                <p>Allocated: {formatIndianCurrency(budget.allocated)}</p>
                <p>Spent: {formatIndianCurrency(budget.spent)}</p>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${calculateProgress(budget.spent, budget.allocated)}%`,
                    backgroundColor: calculateProgress(budget.spent, budget.allocated) > 90 ? 'var(--accent-color)' : 'var(--success-color)'
                  }}
                ></div>
              </div>
              <p className="remaining">
                Remaining: {formatIndianCurrency(budget.allocated - budget.spent)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="add-budget-section">
        <h2>Add New Budget</h2>
        <form onSubmit={handleAddBudget} className="add-budget-form">
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={newBudget.category}
              onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              value={newBudget.allocated}
              onChange={(e) => setNewBudget(prev => ({ ...prev, allocated: parseInt(e.target.value) || 0 }))}
              placeholder="Enter amount"
              min="0"
              step="100"
              required
            />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <input
              type="text"
              value={newBudget.icon}
              onChange={(e) => setNewBudget(prev => ({ ...prev, icon: e.target.value }))}
              placeholder="Enter emoji icon"
            />
          </div>
          <button type="submit" className="add-button">Add Budget</button>
        </form>
      </div>
    </div>
  );
}

export default Budget; 