import { useState } from 'react';
import './Expenses.css';

function Expenses() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Grocery Shopping',
      amount: 8550,
      category: 'Food',
      date: '2024-03-01'
    },
    {
      id: 2,
      description: 'Internet Bill',
      amount: 1499,
      category: 'Utilities',
      date: '2024-03-02'
    }
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
  });

  const categories = [
    'Food',
    'Transportation',
    'Utilities',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount || !newExpense.category || !newExpense.date) {
      alert('Please fill in all fields');
      return;
    }

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    };

    setExpenses(prev => [expense, ...prev]);
    setNewExpense({
      description: '',
      amount: '',
      category: '',
      date: ''
    });
  };

  return (
    <div className="expenses-page">
      <h1>Expenses</h1>

      <div className="card expense-form">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newExpense.description}
              onChange={handleInputChange}
              placeholder="Enter expense description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              step="1"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="button button-primary">
            Add Expense
          </button>
        </form>
      </div>

      <div className="card expenses-list">
        <h2>Recent Expenses</h2>
        <div className="expenses-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td className="amount">₹{expense.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Expenses; 